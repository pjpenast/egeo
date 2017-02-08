const helpers = require('../helpers');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev

// Webpack Plugins
const DefinePlugin = require('webpack/lib/DefinePlugin');
const IgnorePlugin = require('webpack/lib/IgnorePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const OptimizeJsPlugin = require('optimize-js-plugin');

// Webpack Constants
const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;

module.exports = function (env) {
   return webpackMerge(commonConfig({ env: ENV }), {

      devtool: 'source-map',
      output: {
         path: helpers.root('target', 'site', 'web'),

         //IMPORTANT: You must not specify an absolute path here!
         filename: '[name].bundle.js',
         sourceMapFilename: '[name].bundle.map',
         chunkFilename: '[id].chunk.js'
      },

      plugins: [
         new OptimizeJsPlugin({
            sourceMap: false
         }),
         // NOTE: when adding more properties make sure you include them in custom-typings.d.ts
         new DefinePlugin({
            ENV: 'production',
            'process.env.NODE_ENV': '"production"'
         }),

         new UglifyJsPlugin({
            beautify: false, //prod
            output: {
               comments: false
            }, //prod
            mangle: {
               screw_ie8: true
            }, //prod
            compress: {
               screw_ie8: true,
               warnings: false,
               conditionals: true,
               unused: true,
               comparisons: true,
               sequences: true,
               dead_code: true,
               evaluate: true,
               if_return: true,
               join_vars: true,
               negate_iife: false // we need this for lazy v8
            },
         }),

         new NormalModuleReplacementPlugin(
            /angular2-hmr/,
            helpers.root('config/empty.js')
         ),

         new NormalModuleReplacementPlugin(
            /zone\.js(\\|\/)dist(\\|\/)long-stack-trace-zone/,
            helpers.root('config/empty.js')
         ),

         new LoaderOptionsPlugin({
            minimize: true,
            debug: false,
            options: {
               // TODO: Need to workaround Angular 2's html syntax => #id [bind] (event) *ngFor
               htmlLoader: {
                  minimize: true,
                  removeAttributeQuotes: false,
                  caseSensitive: true,
                  customAttrSurround: [
                     [/#/, /(?:)/],
                     [/\*/, /(?:)/],
                     [/\[?\(?/, /(?:)/]
                  ],
                  customAttrAssign: [/\)?\]?=/]
               },

            }
         }),

      ]
   });
}
