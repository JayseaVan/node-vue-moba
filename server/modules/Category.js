// 导出一个mongoose模型
// 在 /routes/admin/index.js 中引用
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String },
    // 父级分类，类型不能直接写成String，而是要表示成它是mongoose数据库中的ObjectId形式，同时要指定一个ref,表示它要关联哪一个模型
    parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' },
})

schema.virtual('children', {
    localField: '_id',
    foreignField: 'parent',
    justOne: false,
    ref: 'Category'
})

schema.virtual('newsList', {
    localField: '_id',
    foreignField: 'categories',
    justOne: false,
    ref: 'Article'
})

module.exports = mongoose.model('Category', schema)