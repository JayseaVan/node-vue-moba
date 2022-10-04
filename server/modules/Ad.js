// 导出一个mongoose模型
// 在 /routes/admin/index.js 中引用
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String },
    // 轮播图
    items: [{
        title: { type: String },
        image: { type: String },
        url: { type: String },
    }]
})

module.exports = mongoose.model('Ad', schema)