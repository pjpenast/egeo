/*
 * © 2017 Stratio Big Data Inc., Sucursal en España.
 *
 * This software is licensed under the Apache License, Version 2.0.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the terms of the License for more details.
 *
 * SPDX-License-Identifier: Apache-2.0.
 */
import * as child_process from 'child_process';
import * as fs from 'fs';
import * as gulp from 'gulp';
import * as path from 'path';
import { buildConfig, sequenceTask } from 'build-tools';

/* Those imports lack typings. */
const gulpClean = require('gulp-clean');
const gulpConnect = require('gulp-connect');

// There are no type definitions available for these imports.
const resolveBin = require('resolve-bin');

const { projectDir } = buildConfig;

/** If the string passed in is a glob, returns it, otherwise append '**\/*' to it. */
function _globify(maybeGlob: string, suffix: string = '**/*'): any {
   if (maybeGlob.indexOf('*') !== -1) {
      return maybeGlob;
   }
   try {
      const stat = fs.statSync(maybeGlob);
      if (stat.isFile()) {
         return maybeGlob;
      }
   } catch (e) { }
   return path.join(maybeGlob, suffix);
}

/** Creates a task that runs the TypeScript compiler */
export function tsBuildTask(tsConfigPath: string): any {
   return execNodeTask('typescript', 'tsc', ['-p', tsConfigPath]);
}

/** Creates a task that runs the Angular Compiler CLI. */
export function ngcBuildTask(tsConfigPath: string): any {
  return execNodeTask('@angular/compiler-cli', 'ngc', ['-p', tsConfigPath]);
}

/** Options that can be passed to execTask or execNodeTask. */
export interface ExecTaskOptions {
  // Whether STDOUT and STDERR messages should be printed.
  silent?: boolean;
  // Whether STDOUT messages should be printed.
  silentStdout?: boolean;
  // If an error happens, this will replace the standard error.
  errMessage?: string;
  // Environment variables being passed to the child process.
  env?: any;
  // Whether the task should fail if the process writes to STDERR.
  failOnStderr?: boolean;
}

/** Create a task that executes a binary as if from the command line. */
export function execTask(binPath: string, args: string[], options: ExecTaskOptions = {}): any {
  return (done: (err?: string) => void) => {
    const env = Object.assign({}, process.env, options.env);
    const childProcess = child_process.spawn(binPath, args, {env});
    const stderrData: string[] = [];

    if (!options.silentStdout && !options.silent) {
      childProcess.stdout.on('data', (data: string) => process.stdout.write(data));
    }

    if (!options.silent || options.failOnStderr) {
      childProcess.stderr.on('data', (data: string) => {
        options.failOnStderr ? stderrData.push(data) : process.stderr.write(data);
      });
    }

    childProcess.on('close', (code: number) => {
      if (options.failOnStderr && stderrData.length) {
        done(stderrData.join('\n'));
      } else {
        code !== 0 ? done(options.errMessage || `Process failed with code ${code}`) : done();
      }
    });
  };
}

/**
 * Create a task that executes an NPM Bin, by resolving the binary path then executing it. These are
 * binaries that are normally in the `./node_modules/.bin` directory, but their name might differ
 * from the package. Examples are typescript, ngc and gulp itself.
 */
export function execNodeTask(packageName: string, executable: string | string[], args?: string[],
                             options: ExecTaskOptions = {}): any {
  if (!args) {
    args = <string[]>executable;
    executable = '';
  }

  return (done: (err: any) => void) => {
    resolveBin(packageName, { executable: executable }, (err: any, binPath: string) => {
      if (err) {
        done(err);
      } else {
        // Execute the node binary within a new child process using spawn.
        // The binary needs to be `node` because on Windows the shell cannot determine the correct
        // interpreter from the shebang.
        execTask('node', [binPath].concat(args!), options)(done);
      }
    });
  };
}

/** Copy files from a glob to a destination. */
export function copyTask(srcGlobOrDir: string | string[], outRoot: string): any {
  if (typeof srcGlobOrDir === 'string') {
    return () => gulp.src(_globify(srcGlobOrDir)).pipe(gulp.dest(outRoot));
  } else {
    return () => gulp.src(srcGlobOrDir.map(name => _globify(name))).pipe(gulp.dest(outRoot));
  }
}

/** Delete files. */
export function cleanTask(glob: string): any {
  return () => gulp.src(glob, { read: false }).pipe(gulpClean(null));
}

/** Build an task that depends on all application build tasks. */
export function buildAppTask(appName: string): any {
  const buildTasks = ['ts', 'scss', 'assets']
    .map(taskName => `:build:${appName}:${taskName}`)
    .filter(taskName => gulp.hasTask(taskName));

  return sequenceTask(
    'egeo:clean-build',
    [...buildTasks]
  );
}
