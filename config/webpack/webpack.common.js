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


module.exports = function (options) {
   return {
      entry: {
         'polyfills': './web/polyfills.ts',
         'vendor': './web/vendor.ts',
         'app': AOT ? './web/main.aot.ts' :
                  './src/main.browser.ts'
      },

      resolve: {
         alias: {
            'egeo': helpers.root('components', 'index.ts'),
         },
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
                  '@angularclass/hmr-loader',
                  'awesome-typescript-loader?declaration=false',
                  'angular2-template-loader',
                  'angular-router-loader'
               ],
               exclude: [/\.(spec|e2e)\.ts$/]
            },
            {
               test: /\.html$/,
               use: 'raw-loader',
               exclude: [helpers.root('web/index.html')]
            },
            {
               test: /\.css$/,
               use: ['style-loader', 'css-loader']
            },
            {
               test: /\.scss$/,
               exclude: '/node_modules/',
               use: ['raw-loader', 'sass-loader']
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
            disabled: false,
            tsConfig: helpers.root('tsconfig.aot.json'),
            resourceOverride: helpers.root('config/resource-override.js')
         })
      ],
   }
};
