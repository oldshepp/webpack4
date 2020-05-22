const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
// 提取css 到单独文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

 module.exports ={
    mode:'development',
    devtool: 'cheap-module-eval-source-map',
    entry:{
        index:'./src/index.js'
    },
    output:{
        filename:'[hash][name].js',
        path:path.resolve(__dirname, 'dist')
    },
    module:{
        rules:[
            {
                test: /\.(png|jpg|gif)$/,
                use:{
                    loader:'url-loader',
                    // exclude: /node_modules/,
                    options:{
                        name:'[name].[ext]',
                        outputPath:'images/',
                        limit:20480 
                        //1024 == 1kb  
                        //小于20kb时打包成base64编码的图片否则单独打包成图片
                    }
                }

            },
            {
                test:/\.(gif|jpg|png)$/,
                // exclude: /node_modules/,
                use:{
                    loader:'file-loader',
                    options:{
                        name:'[name].[ext]',
                        outputPath:'/images',
                    }
                }
            },
            {
                test:/\.css$/,
                // exclude: /node_modules/,
                use:[
                    'css-loader',
                    MiniCssExtractPlugin.loader,
                    'postcss-loader'
                ]
            },
            {
                test: /\.(less|css)$/,
                use: [
                    MiniCssExtractPlugin.loader, 
                    'css-loader', 
                    'postcss-loader', 
                    'less-loader'],
            },           
            {
                test:/\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use:{
                    loader: 'babel-loader',
                }
            },

        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './src/index.html',   // 指定模板文件路径
            filename: 'index.html',   // 指定打包后输出的模板文件名
            minify: {   // 指定模板压缩的规则
                removeAttributeQuotes: true,     // 删除属性的双引号
                collapseWhitespace: true,   // 折叠空行
            },
            hash: true, // 添加hash戳，hash可以避免缓存问题
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/index.css'
        })
      ],
      
      devServer: {
        historyApiFallback: true, // 单页面程序 刷新浏览器会出现404，原因是它通过这个路径（比如： /search/list）来访问后台，所以会出现404，而把historyApiFallback设置为true那么所有的路径都执行index.html
    
        host: '127.0.0.1', // 域名
        // open: true, //支持自动打开浏览器
        hot: true, // 模块热替换，在前端代码变动的时候无需整个刷新页面，只把变化的部分替换掉
        inline: true, // inline选项会为入口页面添加“热加载”功能，即代码改变后重新加载页面
        port: 9090, // 端口
        progress: true, // 配置打包进度条
    //     proxy: proxyConfig._proxy, // 代理后端服务，举例：可本地调试测试接口
    //     before(app) { // 其他中间件之前， 提供执行自定义中间件
    //       apiMocker(app, path.resolve('./mocks/mock.js'), // 举例：可用来做mock数据
    //         proxyConfig._proxy);
    //     },
      },
      resolve: {
        // alias: {
        //     Util: path.resolve(__dirname, 'src/util/'), 
        // },
        // lias 创建 import 或 require 的别名，来确保模块引入变得更简单 例如 import Utility from '../../util/utility.js';
        // 简化写法(不用写文件路径前缀，也不用写引用文件的扩展名)import Utility from 'Util/utility'
        // mainFileds: ['main'], mainFileds 当从 npm 包中导入模块时，决定在 package.json 中使用哪个字段导入模块
        extensions: ['.js', '.jsx', '.json','.ts','.tsx'], // extensions 自动解析确定的扩展
        // moudles: [path.resolve(__dirname, 'node_modules')]
      },
      // optimization优化
      //async 对异步引入的文件分离（默认）
// initial 对同步引入的文件分离
// all 对所有匹配的文件分离 不论是同步还是异步我们都希望分离出来，所以推荐使用 all
      optimization: {
        runtimeChunk: {
          name: 'manifest',
        },
        splitChunks: {
            minSize: 50000,// 分离的包的体积大小
          cacheGroups: {
            vendors: {
              test:  /(react|react-dom)/, //正则匹配要分离的文件
              name: 'vendors',
              chunks: 'all', // 确定对何种引入方式的文件进行分离
              minChunks: 1, // 最小使用的次数
              priority: 10, // 多个缓存组时，需要有优先级排列，优先使用哪个进行分离
            },
            commons: { // 分离公共文件
              name: 'commons',
              chunks: 'all',
              minChunks: 2,
              priority: 5,
            },
          },
        },
      },
    
}

