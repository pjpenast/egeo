const webpack = require('webpack');
const helpers = require('../helpers');

const AssetsPlugin = require('assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const ngcWebpack = require('ngc-webpack');

var CopyWebpackPlugin = (CopyWebpackPlugin = require('copy-webpack-plugin'), CopyWebpackPlugin.default || CopyWebpackPlugin);

const AOT = helpers.hasNpmFlag('aot');
const HMR = helpers.hasProcessFlag('hot');

module.exports = function (options) {
   isProd = options.env === 'production';
   return {
      entry: {
         'polyfills': './web/polyfills.ts',
         'vendor': './web/vendor.ts',
         'app': AOT ? './web/main.aot.ts' :
                  './src/main.browser.ts'
      },

      resolve: {
         extensions: ['.js', '.ts'],
         modules: [helpers.root('web'), helpers.root('node_modules')],
      },

      performance: {
         hints: false
      },

      module: {
         rules: [
            {
               test: /\.ts$/,
               use: [
                  {
                     loader: '@angularclass/hmr-loader',
                     options: {
                        pretty: !isProd,
                        prod: isProd
                     }
                  },
                  { // MAKE SURE TO CHAIN VANILLA JS CODE, I.E. TS COMPILATION OUTPUT.
                     loader: 'ng-router-loader',
                     options: {
                        loader: 'async-import',
                        genDir: 'compiled',
                        aot: AOT
                     }
                  },
                  {
                     loader: 'awesome-typescript-loader',
                     options: {
                        configFileName: 'tsconfig.webpack.json'
                     }
                  },
                  {
                     loader: 'angular2-template-loader'
                  }
               ],
               exclude: [/\.(spec|e2e)\.ts$/]
            },
            {
               test: /\.css$/,
               use: ['to-string-loader', 'css-loader'],
               exclude: [helpers.root('web', 'styles')]
            },
            {
               test: /\.scss$/,
               use: ['to-string-loader', 'css-loader', 'sass-loader'],
               exclude: [helpers.root('web', 'styles')]
            },
            {
               test: /\.html$/,
               use: 'raw-loader',
               exclude: [helpers.root('web/index.html')]
            },
            {
               test: /\.(jpg|png|gif)$/,
               use: 'file-loader'
            },
            {
               test: /\.(svg|woff|woff2|ttf|eot|ico)$/,
               use: "file-loader?name=assets/fonts/[name].[ext]"
            },
            {
               test: /\.(png|jpe?g|gif)$/,
               use: "file-loader?name=assets/images/[name].[ext]"
            }
         ]
      },

      plugins: [
         new AssetsPlugin({
            path: helpers.root('target', 'site', 'web'),
            filename: 'webpack-assets.json',
            prettyPrint: true
         }),
         new CommonsChunkPlugin({
            name: ['polyfills', 'vendor'].reverse()
         }),

         new ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
            helpers.root('web'), // location of your src
            {
               // your Angular Async Route paths relative to this root directory
            }
         ),
         new CopyWebpackPlugin([
            { from: 'web/assets', to: 'assets' },
            { from: 'CHANGELOG.md', to: 'assets/CHANGELOG.md' }
         ]),

         new HtmlWebpackPlugin({
            template: 'web/index.html'
         }),

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
         new ngcWebpack.NgcWebpackPlugin({
            disabled: !AOT,
            tsConfig: helpers.root('tsconfig.webpack.json'),
            resourceOverride: helpers.root('config/resource-override.js')
         })
      ],
   }
};
