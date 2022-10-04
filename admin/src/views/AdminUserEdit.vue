<template>
    <div class="about">
        <!-- 条件判断，如果有id，则显示'编辑分类' -->
      <h1>{{id ? '编辑' : '新建'}}管理员</h1>
      <el-form label-width="120px" @submit.native.prevent="save">
        <el-form-item label="用户名">
            <el-input v-model="model.username"></el-input>
        </el-form-item>
        <!-- 为了安全起见，也出于职业操守，任何人都不应该知道用户的密码，用户名与密码都不应该以明文的形式呈现，而是应该对密码进行散列加密，使任何人都不可见 -->
        <el-form-item label="密码">
            <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                model: {},
            }
        },
        props: {
            // 接收id
            id: {}
        },
        methods: {
            // 将数据发送至服务器
            async save() {
                let res
                if (this.id) {
                    // 编辑是put
                    res = await this.$http.put(`rest/admin_users/${this.id}`, this.model)
                } else {
                    // 新建是post
                    res = await this.$http.post('rest/admin_users', this.model)
                }
                // 创建完一个分类后应该跳转至一个分类列表页面
                this.$router.push('/admin_users/list')
                this.$message({ // 添加提示信息，element-ui提供的方法
                    type: 'success',
                    message: '保存成功'
                })
            },
            // 向后端请求接口，获取数据
            async fetch() {
                const res = await this.$http.get(`rest/admin_users/${this.id}`)
                this.model = res.data
            },
        },
        created() {
            // 条件判断：如果有id，则输入框显示需要编辑的内容（从服务端返回数据），否则为空
            this.id && this.fetch()
        }
    }
</script>  