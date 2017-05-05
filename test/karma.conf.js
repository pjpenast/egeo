const path = require('path');

module.exports = function (config) {

   var srcPath = 'src/lib/';
   var distPath = 'dist/packages/egeo/';

   config.set({
      basePath: path.join(__dirname, '..'),
      frameworks: ['jasmine'],

      plugins: [
         require('karma-jasmine'),
         require('karma-phantomjs-launcher'),
         require('karma-coverage'),
         require('karma-remap-coverage'),
         require('karma-sourcemap-loader'),
         require('karma-junit-reporter'),
         require('karma-mocha-reporter'),
      ],

      client: {
         builtPaths: [distPath],
         clearContext: false // leave Jasmine Spec Runner output visible in browser
      },

      files: [
         // System.js for module loading
         'node_modules/systemjs/dist/system-polyfills.src.js',
         'node_modules/systemjs/dist/system.src.js',

         // Polyfills
         'node_modules/core-js/client/shim.js',
         'node_modules/reflect-metadata/Reflect.js',

         // zone.js
         'node_modules/zone.js/dist/zone.js',
         'node_modules/zone.js/dist/long-stack-trace-zone.js',
         'node_modules/zone.js/dist/proxy.js',
         'node_modules/zone.js/dist/sync-test.js',
         'node_modules/zone.js/dist/jasmine-patch.js',
         'node_modules/zone.js/dist/async-test.js',
         'node_modules/zone.js/dist/fake-async-test.js',

         // Paths loaded via module imports:
         // RxJs
         { pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false },
         { pattern: 'node_modules/rxjs/**/*.js.map', included: false, watched: false },

         // Lodash
         { pattern: 'node_modules/lodash/**/*.js', included: false, watched: false },

         // Angular itself
         { pattern: 'node_modules/@angular/**/*.js', included: false, watched: false },
         { pattern: 'node_modules/@angular/**/*.js.map', included: false, watched: false },

         { pattern: 'test/systemjs.config.js', included: false, watched: false },
         { pattern: 'test/systemjs.config.extras.js', included: false, watched: false },
         'test/karma-test-shim.js', // optionally extend SystemJS mapping e.g., with barrels

         // Default egeo-theme-styles
         'node_modules/@stratio/egeo-theme/egeo-theme-stratio.min.css',
         { pattern: 'node_modules/@stratio/egeo-theme/assets/**/*', included: false, watched: false },

         // transpiled application & spec code paths loaded via module imports
         { pattern: distPath + '**/*.js', included: false, watched: true },


         // Asset (HTML & CSS) paths loaded via Angular's component compiler
         // (these paths need to be rewritten, see proxies section)
         { pattern: distPath + '**/*.html', included: false, watched: true },
         { pattern: distPath + '**/*.css', included: false, watched: true },

         // Paths for debugging with source maps in dev tools
         { pattern: srcPath + '**/*.ts', included: false, watched: false },
         { pattern: 'test/**/*.js', included: false, watched: false },
         { pattern: distPath + '**/*.js.map', included: false, watched: false }
      ],

      exclude: [],
      preprocessors: {
         'dist/packages/**/!(*.spec).js': ['sourcemap'],
         'dist/packages/**/*.js': ['coverage', 'sourcemap']
      },
      reporters: ['mocha', 'coverage', 'remap-coverage', 'junit'],

      // save interim raw coverage report in memory
      coverageReporter: {
         type: 'in-memory'
      },

      // define where to save final remaped coverage reports
      remapCoverageReporter: {
         'text-summary': null,
         'json': './target/coverage/coverage.json',
         'html': './target/coverage/html',
         'lcovonly': './target/lcovUT.info'
      },

      junitReporter: {
         outputDir: './target/surefire-reports', // results will be saved as $outputDir/$browserName.xml
         outputFile: undefined, // if included, results will be saved as $outputDir/$browserName/$outputFile
         suite: ''
      },

      phantomJsLauncher: {
         exitOnResourceError: true
      },

      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: true,
      browsers: ['PhantomJS'],
      singleRun: true,

      // to avoid DISCONNECTED messages
      browserDisconnectTimeout: 30000, // default 2000
      browserDisconnectTolerance: 1, // default 0
      browserNoActivityTimeout: 100000, //default 10000
      captureTimeout: 100000
   })
}
