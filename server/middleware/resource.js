module.exports = options => {

    return async (req, res, next) => {
        // 通过req.params.resource取出资源名称，并利用inflection包将其转换为模型名称
        const modelName = require('inflection').classify(req.params.resource)
        // 转换为模型名称后通过require将其引入进来，得到模型的类，并将其在请求对象req上挂载
        req.Model = require(`../modules/${modelName}`)
        next()
    }
}