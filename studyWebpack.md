一、简述
1.const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

const config = {
  entry: './path/to/my/entry/file.js', // 入口的一种简写
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};
module.exports = config;

entry：即入口，告诉 webpack 从这开始，并根据依赖关系图确定需要打包的内容，也是根上下文或 app 第一个启动文件（该属性名非自定义）。

Output:即出口，处理捆绑、归拢在一起的文件资源。output.filename（非自定义）属性来告诉 webpack归拢后的名字（注意，是告诉webpack，也就是在webpack里该名字有意义），
output.path（非自定义）属性来告诉 webpack归拢后生成在哪里，默认dist文件夹下。

Loader：即module对象，loader 在文件被添加到依赖图中时，将其转换为模块。
webpack 把每个文件(.css, .html, .scss, .jpg, etc.) 都作为模块处理。然而 webpack 自身只理解 JavaScript。
定义 loader 时，要定义在 module.rules 中，而不是 rules。
test属性，本例中指require()/import 语句中（即引入文件时）路径为 '.txt' 的将被转换。
Use属性指对路径所对应的文件打包之前，先使用 raw-loader 转换一下。
loader 有两个目标。（loader 仅在每个文件的基础上执行转换）
1.识别出(identify)应该被对应的 loader 进行转换(transform)的那些文件。(test 属性)
2.2.转换这些文件，从而使其能够被添加到依赖图中（并且最终添加到 bundle 中）(use 属性)

Plugins：插件(plugins) 更常用于（但不限于）在打包模块的 “compilation（编译）” 和 “chunk（块）” 生命周期执行操作和自定义功能。想要使用一个插件，你只需要 require() 它，然后把它添加到 plugins 数组中。多数插件可以通过选项(option)自定义。你也可以在一个配置文件中因为不同目的而多次使用同一个插件，这时需要通过使用 new 来创建它的一个实例。

二、入口起点
1.
