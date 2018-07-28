var path = require('path')
var webpack = require('webpack')
const babel = require('webpack-config-babel6')
const vue = require('webpack-config-vue')
let config = {
    // This is the "main" file which should include all other modules
  entry: './app/static/vue/main.js',
//  plugins: [
//    new webpack.DefinePlugin({
//      'process.env': {
//        NODE_ENV: '"production"'
//      }
//    })
//  ],
  // Where should the compiled file go?
  output: {
    // To the `dist` folder
    path: path.resolve(__dirname, '../backend/static/app'),
    // With the filename `build.js` so it's dist/build.js
    filename: 'build.js'
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/ 
        }
      ]
  }
}

module.exports = config