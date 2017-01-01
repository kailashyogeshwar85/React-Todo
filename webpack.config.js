const path = require('path');


module.exports = {
  entry: './src/index.js',
  output: {
    path: './dist',
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  devServer: {
    inline: true,
    port : 4040
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
       }
      }
    ]
  }
}