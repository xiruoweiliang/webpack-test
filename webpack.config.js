const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack=require('webpack')


// 配置环境变量 得到是dev还是online
const WEBPACK_ENV=process.env.WEBPACK_ENV || 'dev'

const config={
    entry:{
        'common':['./src/page/common/index.js','webpack-dev-server/client?http://localhost:9999'],  //公共文件名要和下面的plugins的name一致 
        'index':['./src/page/index/index.js'],
        'login':['./src/page/login/index.js'],
    },
    // 目标文件
    output:{
        path:'./dist',   //存放文件的地址
        publicPath: '/dist', //访问文件的路径地址  这个是相对于根路径http://localhost:9999
        filename:'js/[name].js'  //打包后的文件
    },
    // 各种文件加载
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")  //检测到以css文件结尾的文件，就使用style-loader或者css-loader
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader', //图片加载
            }
        ]
    },
    // 配置别名  引入文件的时候会方便些
    resolve:{
        alias:{
            util: __dirname  + '/src/util', //_dirname是指当前所在的根目录  这个是给请求数据的文件做的配置
            page: __dirname  + '/src/page' ,
            image: __dirname  + '/src/images',
            service: __dirname  + '/src/service' 
        }
    },
    // 插件
    plugins:[
        // 公共模块的插件
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',  //存的文件名 
            filename: 'js/base.js',   //最后输出的文件名
        }),
        new ExtractTextPlugin("css/[name].css")   //也是放在dist里面 跟上面 js/[name].js 处理一样
    ],
    // 更改默认端口号
    devServer: { 
        host:'127.0.0.1', 
        port:9999 
    },
}

//配置不同环境的
if(WEBPACK_ENV==='dev'){
    config.entry.common.push('webpack-dev-server/client?http://localhost:9999')
}

module.exports=config;

