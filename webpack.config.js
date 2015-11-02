var path = require('path');
var webpack = require('webpack');

var output_path = path.join(__dirname, 'dist');

var config = {
  entry: [
    './src/index'
  ],
  target: "atom",
  output: {
    path: output_path,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'src')
      },
      { test: /\.json$/, loader: "json-loader" },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.png$/, loader: "url-loader?limit=100000" },
    ]
  },
	node: {
		fs: 'empty'
	}
}

if(process.env.DEV) {
  config.plugins = [
    new webpack.HotModuleReplacementPlugin()
  ]
  config.entry.push('webpack-dev-server/client?http://localhost:3000')
  config.entry.push('webpack/hot/only-dev-server')
  config.devtool = 'eval'
} else {
  config.plugins = [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress : {
        // TODO removes all the modes from codemirror (facepalm)
        'unused'    : false,
        'dead_code' : false,
        'warnings': false
      }
    })
  ]
}

module.exports = config
