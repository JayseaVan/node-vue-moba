<template>
    <div class="about">
        <!-- 条件判断，如果有id，则显示'编辑分类' -->
      <h1>{{id ? '编辑' : '新建'}}分类</h1>
      <el-form label-width="120px" @submit.native.prevent="save">
        <el-form-item label="上级分类">
            <el-select v-model="model.parent">
                <el-option v-for="item in parents" :key="item._id"
                :label="item.name" :value="item._id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
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
                parents: []
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
                    res = await this.$http.put(`rest/categories/${this.id}`, this.model)
                } else {
                    // 新建是post
                    res = await this.$http.post('rest/categories', this.model)
                }
                // 创建完一个分类后应该跳转至一个分类列表页面
                this.$router.push('/categories/list')
                this.$message({ // 添加提示信息，element-ui提供的方法
                    type: 'success',
                    message: '保存成功'
                })
            },
            // 向后端请求接口，获取数据
            async fetch() {
                const res = await this.$http.get(`rest/categories/${this.id}`)
                this.model = res.data
            },
            // 向后端请求接口，获取父级选项数据
            async fetchParents() {
                const res = await this.$http.get(`rest/categories`)
                this.parents = res.data
            }
        },
        created() {
            this.fetchParents()
            // 条件判断：如果有id，则输入框显示需要编辑的内容（从服务端返回数据），否则为空
            this.id && this.fetch()
        }
    }
</script>  