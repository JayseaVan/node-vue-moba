module.exports = options => {
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    const AdminUser = require('../modules/AdminUser')

    return async (req, res, next) => {
        // 获取用户信息，最好是从客户端传来的请求头 'Request Headers' 中获取
        // 服务端要做的事：将token提取出来，看看是不是数据库中的用户（前提是客户端有传这个数据）
        const token = String(req.headers.authorization).split(" ")[1]
        // 检验错误信息 (判断用户是否存在)
        assert(token, 401, '请提供jwt token')
        // 提取token数据，并使用jwt进行解析校验
        // const tokenDate = jwt.verify(token, app.get('secret')) 
        // console.log(tokenDate) // { id: '63364f2412fea30f50ea536d', iat: 1664525932 } 得到之前上传到数据库中的用户id
        const { id } = jwt.verify(token, req.app.get('secret')) // 用解构赋值，直接获取到用户id
        assert(id, 401, '无效的jwt token')
        // 根据 id 去数据库中的AdminUser模型中去获取用户user，并将其挂载到 req 或者 res 中，以便后续的中间件可以该获取数据，否则若不挂载，只有当前中间件可以使用到该user数据
        req.user = await AdminUser.findById(id) // 表示客户端请求的数据是谁
        // 检验错误信息 (判断用户是否存在)
        assert(req.user, 401, '请先登录')
        console.log(req.user)
        await next()
    }
}