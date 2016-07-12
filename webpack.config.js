var path = require('path');
var webpack = require('webpack');//之前的配置是entry中第一行去掉，module中test js项去掉

module.exports = {
  entry: {
    main:[
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/dev-server',
    path.resolve(__dirname, './app/main.js')],
    login:[
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/dev-server',
    path.resolve(__dirname, './app/login.js')],
    team:[
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/dev-server',
    path.resolve(__dirname, './app/team.js')],
    collect:[
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/dev-server',
    path.resolve(__dirname, './app/collect.js')]
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      loaders: ['react-hot','babel'],//loader:'react-hot!babel'
      exclude: /node_modules/
    },{
      test: /\.jsx?$/,
      loader: "babel?presets[]=react,presets[]=es2015"
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.less$/,
      loader: 'style!css!less'
    },{ 
      test: /\.(png|jpg)$/, 
      loader: 'url?limit=25000' 
    },{
       test   : /\.woff|\.woff2|\.svg|.eot|\.ttf/,
       loader : 'url?prefix=font/&limit=10000'
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};