// 导出一个mongoose模型
// 在 /routes/admin/index.js 中引用
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title: { type: String },
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
    // 详情
    body: { type: String },
}, {
    // 自带时间戳，在录入数据时自动带上 createTime 和 updateTime
    timestamps: true,
})

module.exports = mongoose.model('Article', schema)