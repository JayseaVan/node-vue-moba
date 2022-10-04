// 导出一个mongoose模型
// 在 /routes/admin/index.js 中引用
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String },
    // 图片只需要保存图片地址
    icon: { type: String },
})

module.exports = mongoose.model('Item', schema)