module.exports = function (config) {
   var testWebpackConfig = require('./webpack.test.js');

   var configuration = {
      basePath: '',

      frameworks: ['jasmine'],


      files: [
         './config/spec-bundle.js'
      ],
      exclude: [],
      preprocessors: {
         './config/spec-bundle.js': ['coverage', 'webpack', 'sourcemap']
      },

      webpack: testWebpackConfig,

      coverageReporter: {
         type: 'in-memory'
      },

      htmlReporter: {
         outputFile: 'tests/units.html',

         // Optional
         pageTitle: 'Unit Tests',
         subPageTitle: 'A sample project description',
         groupSuites: true,
         useCompactStyle: true,
         useLegacyStyle: true
      },

      remapCoverageReporter: {
         'text-summary': null,
         'json': './target/coverage/coverage.json',
         'html': './target/coverage/html',
         'lcovonly': './target/lcovUT.info'
      },

      webpackMiddleware: {
         stats: 'errors-only'
      },

      reporters: ['mocha', 'junit', 'coverage', 'remap-coverage'],
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: false,
      browsers: ['PhantomJS'],

      phantomJsLauncher: {
         exitOnResourceError: true
      },

      junitReporter: {
         outputDir: './target/surefire-reports', // results will be saved as $outputDir/$browserName.xml
         outputFile: undefined, // if included, results will be saved as $outputDir/$browserName/$outputFile
         suite: ''
      },
      // to avoid DISCONNECTED messages
      browserDisconnectTimeout: 30000, // default 2000
      browserDisconnectTolerance: 1, // default 0
      browserNoActivityTimeout: 100000, //default 10000
      captureTimeout: 100000,

      singleRun: true
   };

   config.set(configuration);
};
