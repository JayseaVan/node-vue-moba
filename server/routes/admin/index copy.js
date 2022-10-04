// 路由(备份)
module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const Category = require('../../modules/Category')

    // 定义创建分类接口
    router.post('/categories', async(req, res) => {
        // 创建数据，数据来源是客户端提交的
        // 同时要想使用数据，必须将数据转为json并解决跨域问题，在入口的index.js中配置
        const model = await Category.create(req.body)
        res.send(model) // 发送数据回客户端，告诉其创建完成
    })

    // 编辑分类 put 接口
    router.put('/categories/:id', async(req, res) => {
        // 修改数据，根据id去找，找完之后进行更新
        const model = await Category.findByIdAndUpdate(req.params.id, req.body)
        res.send(model) // 发送数据回客户端，告诉其创建完成
    })

    // 删除分类 delete 接口
    router.delete('/categories/:id', async(req, res) => {
        // 删除数据，根据id去找，找到之后删除
        await Category.findByIdAndDelete(req.params.id, req.body)
        // 删完之后不需要返回值，客户端只需要返回'success: true'
        res.send({
            success: true
        })
    })

    // 定义分类列表接口
    router.get('/categories', async(req, res) => {
        // 使用Category.find()，找到数据，限制10条
        // 添加 .populate('parent') 方法，表示关联(取出)数据库中需要的字段
        const items = await Category.find().populate('parent').limit(10)
        res.send(items) // 发送数据回客户端，告诉其创建完成
    })

    // 获取详情页，某一个分类详情的接口
    router.get('/categories/:id', async(req, res) => {
        // 使用Category.find()，找到数据，限制10条
        const model = await Category.findById(req.params.id)
        res.send(model) // 发送数据回客户端，告诉其创建完成
    })
    app.use('/admin/api', router)
}