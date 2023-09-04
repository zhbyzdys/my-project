//__dirname是node.js中的一个全局变量，它指向当前执行脚本所在的目录
//webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const paths = require('./paths');
module.exports = {
    devtool: 'eval-source-map',//生成Source Maps,这里选择eval-source-map
    entry: './src/App.js',
    output: {//输出目录
        path: './build',//打包后的js文件存放的地方
        filename: './src/App.js'//打包后输出的js的文件名
    },
    module: {
        //loaders加载器
        rules: [
            {
                test: /\.(js|jsx)$/,//一个匹配loaders所处理的文件的拓展名的正则表达式，这里用来匹配js和jsx文件（必须）
                exclude: /node_modules/,//屏蔽不需要处理的文件（文件夹）（可选）
                use: 'babel-loader'//babel-loader的名称（必须）
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true
                            }
                        }
                    }
                ]
            }, {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['/build']),
        new HtmlWebpackPlugin({
            title: "自动生成自定义标题",//如果使用了模板，就使用模板里的title，这里的title设置会失效，哪怕模板里的title为空
            template: 'index.html',//需要编译的模板,可以是jade等第三方模板引擎也可以说纯html页面
            // filename:'demo.html',//最终生成的文件名,默认是index.html
            hash: true,//是否给所有包含的js、css文件后面添加hash值,可以用来清除缓存，但好像不是很管用
            inject: true,// | 'head' | 'body' | false  ,注入所有的资源到特定的 template 或者 templateContent 中，如果设置为 true 或者 body，所有的 javascript 资源将被放置到 body 元素的底部，'head' 将放置到 head 元素中。
            //chunks:['index'] //指定生成的文件demo.hmtl需要包括entry里的哪些入口文件(这里是index,main.js不会引入),不设置的话所以入口js文件都会被引入进来
        })],
    //webpack-dev-server配置
    devServer: {
        contentBase: './build',//默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录（本例设置到"build"目录）
        historyApiFallback: true,//在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        inline: true,//设置为true，当源文件改变时会自动刷新页面
        port: 8001,//设置默认监听端口，如果省略，默认为"8080"
    }

};