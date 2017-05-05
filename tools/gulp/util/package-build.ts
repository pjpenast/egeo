import { writeFileSync, copySync, mkdirpSync, readFileSync } from 'fs-extra';
import { sync as glob } from 'glob';
import { join, basename, dirname } from 'path';
import { ScriptTarget, ModuleKind } from 'typescript';

import { DIST_BUNDLES, DIST_ROOT, SOURCE_ROOT, PROJECT_ROOT, LICENSE_BANNER } from '../constants';
import { addPureAnnotations } from './annotate-pure';
import { inlineMetadataResources } from './inline-resources';
import { createRollupBundle } from './rollup-helper';
import { transpileFile } from './ts-compiler';

// There are no type definitions available for these imports.
const uglify = require('uglify-js');
const sorcery = require('sorcery');

/**
 * Copies different output files into a folder structure that follows the `angular/angular`
 * release folder structure. The output will also contain a README and the according package.json
 * file. Additionally the package will be Closure Compiler and AOT compatible.
 */
export function composeRelease(packageName: string): void {
   // To avoid refactoring of the project the package egeo will map to the source path `lib/`.
   let sourcePath = join(SOURCE_ROOT, packageName === 'egeo' ? 'lib' : packageName);
   let packagePath = join(DIST_ROOT, 'packages', packageName);
   let releasePath = join(DIST_ROOT, 'releases', packageName);

   inlinePackageMetadataFiles(packagePath);

   copyFiles(packagePath, '**/*.+(d.ts|metadata.json)', join(releasePath, 'typings'));
   copyFiles(DIST_BUNDLES, `${packageName}.umd?(.min).js?(.map)`, join(releasePath, 'bundles'));
   copyFiles(DIST_BUNDLES, `${packageName}?(.es5).js?(.map)`, join(releasePath, '@stratio'));
   copyFiles(PROJECT_ROOT, 'LICENSE', releasePath);
   copyFiles(SOURCE_ROOT, 'README.md', releasePath);
   copyFiles(SOURCE_ROOT, 'CHANGELOG.md', releasePath);

   createTypingFile(releasePath, packageName);
   createMetadataFile(releasePath, packageName);
   addPureAnnotationCommentsToEs5Bundle(releasePath, packageName);
}

/** Builds the bundles for the specified package. */
export async function buildPackageBundles(entryFile: string, packageName: string): Promise<any> {
   let moduleName = `egeo.${packageName}`;

   // List of paths to the package bundles.
   let fesm2015File = join(DIST_BUNDLES, `${packageName}.js`);
   let fesm2014File = join(DIST_BUNDLES, `${packageName}.es5.js`);
   let umdFile = join(DIST_BUNDLES, `${packageName}.umd.js`);
   let umdMinFile = join(DIST_BUNDLES, `${packageName}.umd.min.js`);

   // Build FESM-2015 bundle file.
   await createRollupBundle({
      moduleName: moduleName,
      entry: entryFile,
      dest: fesm2015File,
      format: 'es'
   });

   await remapSourcemap(fesm2015File);

   // Downlevel FESM-2015 file to ES5.
   transpileFile(fesm2015File, fesm2014File, {
      target: ScriptTarget.ES5,
      module: ModuleKind.ES2015,
      allowJs: true
   });

   await remapSourcemap(fesm2014File);

   // Create UMD bundle of FESM-2014 output.
   await createRollupBundle({
      moduleName: moduleName,
      entry: fesm2014File,
      dest: umdFile,
      format: 'umd'
   });

   await remapSourcemap(umdFile);

   uglifyFile(umdFile, umdMinFile);

   await remapSourcemap(umdMinFile);
}

/**
 * Finds the original sourcemap of the file and maps it to the current file.
 * This is useful when multiple transformation happen (e.g TSC -> Rollup -> Uglify)
 */
async function remapSourcemap(sourceFile: string): Promise<any> {
   return (await sorcery.load(sourceFile)).write();
}

/** Minifies a JavaScript file using UglifyJS2. Also writes sourcemaps to the output. */
function uglifyFile(inputPath: string, outputPath: string): void {
   let sourcemapOut = `${outputPath}.map`;
   let result = uglify.minify(inputPath, {
      preserveComments: 'license',
      outSourceMap: sourcemapOut
   });

   writeFileSync(outputPath, result.code);
   writeFileSync(sourcemapOut, result.map);
}

function copyFiles(fromPath: string, fileGlob: string, outDir: string): void {
   glob(fileGlob, { cwd: fromPath }).forEach(filePath => {
      let fileDestPath = join(outDir, filePath);
      mkdirpSync(dirname(fileDestPath));
      copySync(join(fromPath, filePath), fileDestPath);
   });
}

/** Create a typing file that links to the bundled definitions of NGC. */
function createTypingFile(outputDir: string, entryName: string): void {
   writeFileSync(join(outputDir, `${entryName}.d.ts`),
      LICENSE_BANNER + '\nexport * from "./typings/index";'
   );
}

/** Creates a metadata file that re-exports the metadata bundle inside of the typings. */
function createMetadataFile(packageDir: string, packageName: string): void {
   const metadataReExport =
      `{"__symbolic":"module","version":3,"metadata":{},"exports":[{"from":"./typings/index"}]}`;
   writeFileSync(join(packageDir, `${packageName}.metadata.json`), metadataReExport, 'utf-8');
}

/** Inlines HTML and CSS resources into `metadata.json` files. */
function inlinePackageMetadataFiles(packagePath: string): void {
   // Create a map of fileName -> fullFilePath. This is needed because the templateUrl and
   // styleUrls for each component use just the filename because, in the source, the component
   // and the resources live in the same directory.
   const componentResources = new Map<string, string>();

   glob(join(packagePath, '**/*.+(html|css)')).forEach(resourcePath => {
      componentResources.set(basename(resourcePath), resourcePath);
   });

   // Find all metadata files. For each one, parse the JSON content, inline the resources, and
   // reserialize and rewrite back to the original location.
   glob(join(packagePath, '**/*.metadata.json')).forEach(path => {
      let metadata = JSON.parse(readFileSync(path, 'utf-8'));
      inlineMetadataResources(metadata, componentResources);
      writeFileSync(path, JSON.stringify(metadata), 'utf-8');
   });
}

/** Adds Uglify "@__PURE__" decorations to the generated ES5 bundle. */
function addPureAnnotationCommentsToEs5Bundle(outputDir: string, entryName: string): void {
   const es5BundlePath = join(outputDir, '@stratio', `${entryName}.es5.js`);
   const originalContent = readFileSync(es5BundlePath, 'utf-8');
   const annotatedContent = addPureAnnotations(originalContent);

   writeFileSync(es5BundlePath, annotatedContent, 'utf-8');
}
