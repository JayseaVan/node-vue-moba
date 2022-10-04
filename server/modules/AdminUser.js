// 导出一个mongoose模型
// 在 /routes/admin/index.js 中引用
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: { type: String },
    // 为了安全起见，也出于职业操守，任何人都不应该知道用户的密码，用户名与密码都不应该以明文的形式呈现，而是应该对密码进行散列加密，使任何人都不可见
    // 密码特殊操作：1.安装并引入 bcrypt 模块；2.使用 hashSync 散列加密，加密等级一般10-12
    password: {
        type: String,
        select: false, // 设置散列加密后，密码(点击编辑页面)不显示
        set(val) {
            return require('bcrypt').hashSync(val, 10);
        }
    },
})

module.exports = mongoose.model('AdminUser', schema)