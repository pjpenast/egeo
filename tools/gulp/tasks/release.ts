import { task, watch } from 'gulp';
import { join } from 'path';

import { SOURCE_ROOT } from '../constants';
import { sequenceTask, triggerLivereload } from '../util/task_helpers';
import { composeRelease } from '../util/package-build';

const libraryRoot = join(SOURCE_ROOT, 'lib');


task('build:release', sequenceTask(
   'library:clean-build',
   ':package:release'
));

/** Task that composes the different build files into the release structure. */
task(':package:release', () => composeRelease('egeo'));

task('build:release:watch', sequenceTask(
   'library:build',
   ':package:release'
));

/** [Watch task] Rebuilds the library whenever TS, SCSS, or HTML files change for npm link */
task('release:watch', () => {
   watch(join(libraryRoot, '**/*.ts'),   ['build:release:watch', triggerLivereload]);
   watch(join(libraryRoot, '**/*.scss'), ['build:release:watch', triggerLivereload]);
   watch(join(libraryRoot, '**/*.html'), ['build:release:watch', triggerLivereload]);
});
