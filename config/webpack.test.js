const helpers = require('./helpers');
const path = require('path');

/**
 * Webpack Plugins
 */
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'test';
const COMPONENT_ENV = process.env.npm_config_component;

module.exports = {
   devtool: 'inline-source-map',

   resolve: {
      extensions: ['.ts', '.js', '.scss'],
      modules: ['node_modules', helpers.root('src')]
   },

   performance: {
      hints: false
   },

   module: {

      rules: [{
            enforce: 'post',
            test: /\.(js|ts)$/,
            loader: 'istanbul-instrumenter-loader',
            include: helpers.root('src'),
            exclude: [
               /\.(e2e|spec)\.ts$/,
               /node_modules/
            ]
         }, {
            test: /\.ts$/,
            use: [{
                  loader: 'awesome-typescript-loader',
                  query: {
                     module: 'commonjs'
                  }
               },
               {
                  loader: 'angular2-template-loader'
               }
            ]
         },
         {
            test: /\.html$/,
            loader: 'raw-loader'
         },
         {
            test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)/,
            loader: 'null-loader'
         },
         {
            test: /\.css$/,
            exclude: helpers.root('src'),
            loader: 'null-loader'
         },
         {
            test: /\.css$/,
            include: helpers.root('src'),
            loader: 'raw-loader'
         },
         {
            test: /\.scss$/,
            exclude: '/node_modules/',
            loaders: ['raw-loader', 'sass-loader']
         }
      ]
   },

   plugins: [
      new ContextReplacementPlugin(
         // The (\\|\/) piece accounts for path separators in *nix and Windows
         /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
         helpers.root('./src') // location of your src
      ),
      new DefinePlugin({
         'COMPONENT_ENV': JSON.stringify(COMPONENT_ENV)
      }),
   ]
}
