const config={
    entry:{
        'index':['./src/page/index/index.js'],
        'login':['./src/page/login/index.js'],
    },
    // 目标文件
    output:{
        path:'./dist',   //存放文件的地址
        publicPath: '/dist', //访问文件的路径地址  这个是相对于根路径http://localhost:9999
        filename:'js/[name].js'  //打包后的文件
    }
}
module.exports=config;

