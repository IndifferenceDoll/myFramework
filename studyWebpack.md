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
1.简写
const config = {
  entry: './path/to/my/entry/file.js'
};

module.exports = config;
入口的简写，在只有一个入口文件的情况下使用，可扩展性差。
2.对象语法
const config = {
  entry: {
    app: './src/app.js',
    vendors: './src/vendors.js'
  }
};
用法：entry: {[entryChunkName: string]: string|Array<string>}
对象语法会比较繁琐。然而，这是应用程序中定义入口的最可扩展的方式。
entry里的属性名可自定义，其属性值为字符串时，表示单个入口文件，为数组时，表示创建多个主入口，即多个依赖文件一起注入，并且将它们的依赖导向(graph)到一个“chunk”（块）时，传入数组的方式就很有用。
每一个属性名表示以该属性名下路径为入口文件，进而开始创建依赖图。这些依赖图是彼此完全分离、互相独立的。此例子的方式比较常见于，只有一个入口起点（不包括 vendor）的单页应用程序(single page application)中。
（此设置允许你使用 CommonsChunkPlugin 从「应用程序 bundle」中提取 vendor 引用(vendor reference) 到 vendor bundle，并把引用 vendor 的部分替换为 __webpack_require__() 调用。如果应用程序 bundle 中没有 vendor 代码，那么你可以在 webpack 中实现被称为长效缓存的通用模式。ps：括号里这段什么意思并不明白，但貌似这个套路要被移除／为了支持提供更佳 vendor 分离能力的 DllPlugin，考虑移除该场景。／）
3.多页面应用程序
const config = {
  entry: {
    pageOne: './src/pageOne/index.js',
    pageTwo: './src/pageTwo/index.js',
    pageThree: './src/pageThree/index.js'
  }
};
 这里意味着webpack建立了三个独立分离的依赖图，每一个属性名代表一个入口一个块，每个块就是一个单页面文档（或者说项目？）。在多页应用中，每当页面跳转时服务器将为你获取一个新的 HTML 文档。页面重新加载新文档，并且资源被重新下载。这样就实现了在多个单页面项目之间跳转，即实现多页面应用。
 优点：由于入口起点增多，多页应用能够复用入口起点之间的大量代码/模块，从而可以极大地从这些技术中受益。
