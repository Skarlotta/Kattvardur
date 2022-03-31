const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const devenv = require("./devenv.json");

module.exports = {
   entry: './index.js',
   output: {
      path: path.join(__dirname, '../frontend/public'),
      filename: 'kattvardur.js',
      publicPath : '/'
   },
   devServer: {
   proxy: {
      '/api': 'http://localhost:8080',
      },
    headers: {
        'Cache-Control': 'no-store',
      },
      inline: true,
      port: 3000,
      historyApiFallback: true,
   },
   cache: true,
   module: {
      rules: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
         },
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
         }, 
         {
            test: /\.css?$/,
            exclude: /node_modules/,
            use: ['style-loader', 'css-loader']
         }
      ]
   },
   plugins:[    
      new webpack.DefinePlugin({
      'process.env': JSON.stringify(devenv),
    }),
    new HtmlWebpackPlugin({
        template:"./index.html",
    }),
   ]
}
