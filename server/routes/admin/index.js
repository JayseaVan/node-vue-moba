// (后台管理)路由 
module.exports = app => {
    const express = require('express')
    const jwt = require('jsonwebtoken')
    // https://www.npmjs.com/package/http-assert     assert 检测value是否为not truthy，可根据状态码，抛出错误信息
    // assert(value, [status], [message], [properties])   Tests if value is truthy. If value is not truthy, an HttpError is thrown that is constructed with the given status, message, and properties.
    const assert = require('http-assert')
    const AdminUser = require('../../modules/AdminUser')
    const router = express.Router({
        mergeParams: true
    })

    /* 1.通用CRUD接口【增删改查路由】 */
    // 定义创建分类接口 (创建资源)
    router.post('/', async (req, res) => {
        // 创建数据，数据来源是客户端提交的
        // 同时要想使用数据，必须将数据转为json并解决跨域问题，在入口的index.js中配置
        const model = await req.Model.create(req.body)
        res.send(model) // 发送数据回客户端，告诉其创建完成
    })

    // 编辑分类 put 接口 (更新资源)
    router.put('/:id', async (req, res) => {
        // 修改数据，根据id去找，找完之后进行更新
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model) // 发送数据回客户端，告诉其创建完成
    })

    // 删除分类 delete 接口 (删除资源)
    router.delete('/:id', async (req, res) => {
        // 删除数据，根据id去找，找到之后删除
        await req.Model.findByIdAndDelete(req.params.id, req.body)
        // 删完之后不需要返回值，客户端只需要返回'success: true'
        res.send({
            success: true
        })
    })

    // 定义分类列表接口 (资源列表)
    // 加入【中间件】，用于jwt登录校验 (前端传上来的用户，后端进行解密得到id，再通过id去数据库中找到该用户，最终将其挂载到req上)
    router.get('/', async (req, res) => {
        const queryOptions = {}
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        // 使用req.Model.find()，找到数据，此处限制100条
        // 添加 .populate('parent') 方法，表示关联(取出)数据库中需要的字段
        const items = await req.Model.find().setOptions(queryOptions).limit(100)
        res.send(items) // 发送数据回客户端，告诉其创建完成
    })

    // 获取详情页，某一个分类详情的接口 (资源详情)
    router.get('/:id', async (req, res) => {
        // 使用req.Model.find()，找到数据，限制10条
        const model = await req.Model.findById(req.params.id)
        res.send(model) // 发送数据回客户端，告诉其创建完成
    })

    // 登录校验中间件  (在【资源(增删改查)路由】和【上传路由】需要用到)
    const authMiddleware = require('../../middleware/auth')

    // 获取模型中间件  (在【资源(增删改查)路由】需要用到)
    const resourceMiddleware = require('../../middleware/resource')

    /* 1.【资源(增删改查)路由】 express链式操作 */
    app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)


    /* 2.【上传路由】 */
    // express本身获取不到上传文件的数据，所以需要引入multer加载中间件
    const multer = require('multer')
    // dest表示'destination'目标地址，需要用绝对路径
    const upload = multer({ dest: __dirname + '/../../uploads' })
    // 【上传文件路由】  利用中间件 upload.single() 表示上传单个文件，传入字段名'file'，是网络请求中表单数据(Form data)的名称
    app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
        // 利用中间件，req可以获取到file，否则直接是读取不到的
        const file = req.file;
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file);
    })

    // 在node.js写东西，想要被访问的东西可见，必须要配置路由
    // 要使上传文件可见


    /* 3.【登录路由】 */
    // 接收前端传来的用户名、密码数据，对其进行校验，成功匹配则返回一个token密钥(后续可用这串密钥证明用户身份，实现最终的鉴权)，否则返回错误信息
    app.post('/admin/api/login', async (req, res) => {
        // 解构赋值
        const { username, password } = req.body
        /* 【实现用户登录授权的步骤】 */
        // 1.根据用户名找用户 (去数据库中定义的用户模型中去找) (在文件顶部引入了)
        
        // 因为在 AdminUser 模型中使用了'select: false'使密码不可见，默认使用findOne()是取不到password的，所以需要加上select('+password')
        const user = await AdminUser.findOne({username}).select('+password')
        // 422 (Unprocessable entity) 表现为请求格式正确，但出现了 语义 错误，以至于服务端无法响应。可以理解为服务端能理解请求资源类型 content-type，也能理解请求实体内容 (实体的语法也没有问题)，但是由于含有语义错误，无法响应。
        /* if (!user) {
            return res.status(422).send({
                message: '用户不存在'
            })
        } */
        assert(user, 422, '用户不存在')

        // 2.校验密码
        // 比较明文与密文
        const isValid = require('bcrypt').compareSync(password, user.password)
        if (!isValid) {
            // 统一422表示客户端提交的数据有问题，用来验证错误
            return res.status(422).send({
                message: '密码错误'
            })
        }
        // assert(isValid, 422, '密码错误')
        
        // 3.返回token
        // 首先并引入安装 'jsonwebtoken'模块 (在文件顶部引入了)
        
        // 通过jwt的sign签名方法，给用户的id及密钥进行散列加密处理，得到token
        const token = jwt.sign({ id: user._id }, app.get('secret'))
        res.send({token})
    })


    // 【错误处理函数】
    app.use(async (err, req, res, next) => {
        // 如果没有状态码，就报500的错误
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })

}