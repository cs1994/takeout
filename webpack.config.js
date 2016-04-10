var path = require('path');
var webpack = require('webpack');
var node_modules = path.resolve(__dirname, 'node_modules');
var path_React = path.resolve(node_modules, 'react/dist/react.min.js');
var path_ReactDOM = path.resolve(node_modules, 'react-dom/dist/react-dom.min.js');
var path_ReactRouter = path.resolve(node_modules, 'react-router/umd/ReactRouter.min.js');
//var path_Ueditor = path.resolve(node_modules, 'ueditor/example/public/ueditor/ueditor.all.min.js');
//var path_Ueditor_Config = path.resolve(node_modules, 'ueditor/example/public/ueditor/ueditor.config.js');
//var path_zh_cn = path.resolve(node_modules, 'ueditor/example/public/ueditor/lang/zh-cn/zh-cn.js');

module.exports = {
  entry: {
    admin: './public/admin/index.js',
    customer:'./public/customer/index.js',
    //customer:'./public/javascripts/customer/index.js'
  },
  resolve: {
    alias: {
      'react': path_React,
      'react-dom': path_ReactDOM,
      'react-router':path_ReactRouter,
      //'ueditor':path_Ueditor,
      //'ueditor-config':path_Ueditor_Config,
      //'zh-cn':path_zh_cn
    },
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: path.join(__dirname, 'public/dist'),
    filename: '[name].js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    //new webpack.optimize.CommonsChunkPlugin({name: 'vendors'})
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      },{
        test: /\.css$/,
        loader: 'style!css'
      }
    ]
  }
};


// When inside Redux repo, prefer src to compiled version.
// You can safely delete these lines in your project.
var reduxSrc = path.join(__dirname, '..', '..', 'src')
var reduxNodeModules = path.join(__dirname, '..', '..', 'node_modules')
var fs = require('fs')
if (fs.existsSync(reduxSrc) && fs.existsSync(reduxNodeModules)) {
  // Resolve Redux to source
  module.exports.resolve = { alias: { 'redux': reduxSrc } }
  // Our root .babelrc needs this flag for CommonJS output
  process.env.BABEL_ENV = 'commonjs'
  // Compile Redux from source
  module.exports.module.loaders.push({
    test: /\.js$/,
    loaders: [ 'babel' ],
    include: reduxSrc
  })
}
