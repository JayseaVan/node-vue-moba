// 连接数据库
// 数据库插件函数
module.exports = app => {
    const mongoose = require('mongoose')
    mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba', {
        useNewUrlParser: true
    })

    // 首先把所有要使用的模型引用进来(以防到时使用时报错)，利用插件'require-all'
    require('require-all')(__dirname + '/../modules')
}