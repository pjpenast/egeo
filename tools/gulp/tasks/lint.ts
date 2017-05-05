import gulp = require('gulp');

import { execNodeTask } from '../util/task_helpers';
import { DIST_EGEO } from '../constants';

gulp.task('lint', ['tslint', 'madge']);

/** Task that runs madge to detect circular dependencies. */
gulp.task('madge', ['library:clean-build'], execNodeTask('madge', ['--circular', DIST_EGEO]));

const tsLintBaseFlags = ['-c', 'tslint.json', '+(src|e2e|tools)/**/*.ts', '--exclude',
   '**/node_modules/**/*'];

/** Task to run TSLint against the e2e/ and src/ directories. */
gulp.task('tslint', execNodeTask('tslint', tsLintBaseFlags));

/** Task that automatically fixes TSLint warnings. */
gulp.task('tslint:fix', execNodeTask('tslint', [...tsLintBaseFlags, '--fix']));
