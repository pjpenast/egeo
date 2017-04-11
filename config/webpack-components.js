const helpers = require('./helpers'),
   webpack = require('webpack');

/**
 * Webpack Plugins
 */
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

module.exports = {
   devtool: 'source-map',

   resolve: {
      extensions: ['.ts', '.js']
   },

   entry: './src/index.ts',

   output: {
      path: helpers.root('dist','bundle'),
      filename: 'egeo.js',
      libraryTarget: 'commonjs2',
      library: 'egeo'
   },

   // require those dependencies but don't bundle them
   externals: [/^\@angular\//, /^rxjs\//, /^lodash/],

   module: {
      rules: [{
         test: /\.ts$/,
         use: [{
            loader: 'awesome-typescript-loader?declaration=false',
            options: {
               tsconfig: 'tsconfig.lib.json'
            }
         },
         {
            loader: 'angular2-template-loader'
         }
         ],
         exclude: [/\.(spec|e2e)\.ts$/]
      },
      {
         test: /\.html$/,
         use: ['raw-loader']
      },
      {
         test: /\.css$/,
         use: ['to-string-loader', 'css-loader']
      },
      {
         test: /\.scss$/,
         use: ['to-string-loader', 'css-loader', 'sass-loader']
      }
      ]
   },

   plugins: [
      new ContextReplacementPlugin(
         /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
         helpers.root('src'), // location of your web
         {}
      ),
      // Fix Angular 2
      new NormalModuleReplacementPlugin(
         /facade(\\|\/)async/,
         helpers.root('node_modules/@angular/core/src/facade/async.js')
      ),
      new NormalModuleReplacementPlugin(
         /facade(\\|\/)collection/,
         helpers.root('node_modules/@angular/core/src/facade/collection.js')
      ),
      new NormalModuleReplacementPlugin(
         /facade(\\|\/)errors/,
         helpers.root('node_modules/@angular/core/src/facade/errors.js')
      ),
      new NormalModuleReplacementPlugin(
         /facade(\\|\/)lang/,
         helpers.root('node_modules/@angular/core/src/facade/lang.js')
      ),
      new NormalModuleReplacementPlugin(
         /facade(\\|\/)math/,
         helpers.root('node_modules/@angular/core/src/facade/math.js')
      ),

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
      })
   ]
};
