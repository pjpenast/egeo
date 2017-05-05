import { join } from 'path';

export const PROJECT_ROOT = join(__dirname, '../..');
export const SOURCE_ROOT = join(PROJECT_ROOT, 'src');

/** Root build output directory */
export const DIST_ROOT = join(PROJECT_ROOT, 'dist');

/** Output subdirectory where all bundles will be written (flat ES modules and UMD) */
export const DIST_BUNDLES = join(DIST_ROOT, 'bundles');

/** Output subdirectory where all library artifacts will be written (compiled JS, CSS, etc.) */
export const DIST_EGEO = join(DIST_ROOT, 'packages', 'egeo');

/** Output release directory */
export const DIST_RELEASES = join(DIST_ROOT, 'releases');

export const HTML_MINIFIER_OPTIONS = {
   collapseWhitespace: true,
   removeComments: true,
   caseSensitive: true,
   removeAttributeQuotes: false
};

export const LICENSE_BANNER = `/**
 * Copyright (C) 2016 Stratio (http://stratio.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */`;

export const NPM_VENDOR_FILES = ['@angular', 'core-js/client', 'rxjs', 'systemjs/dist', 'zone.js/dist'];

export const COMPONENTS_DIR = join(SOURCE_ROOT, 'lib');
