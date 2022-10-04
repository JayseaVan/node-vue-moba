const express = require('express')

const app = express()

// 在全局中设置一个密钥变量(全局均可使用访问)
app.set('secret', 'fsdgs4g54asd546a21asd')

app.use(require('cors')()) // 跨域模块
app.use(express.json())

// 在node.js写东西，想要被访问的东西可见，必须要配置路由
// （将上传的文件资源设置）特殊路由：静态文件托管
// 以下表示 /uploads 文件里的东西都是静态文件
app.use('/uploads', express.static(__dirname + '/uploads'))
// 静态文件托管 admin 和 web
app.use('/admin', express.static(__dirname + '/admin'))
app.use('/', express.static(__dirname + '/web'))

require('./plugins/db')(app)
require('./routes/admin')(app)
require('./routes/web')(app)

app.listen(3000, () => {
    console.log('http://localhost:3000');
})