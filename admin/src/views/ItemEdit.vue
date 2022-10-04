<template>
    <div class="about">
        <!-- 条件判断，如果有id，则显示'编辑分类' -->
      <h1>{{id ? '编辑' : '新建'}}物品</h1>
      <el-form label-width="120px" @submit.native.prevent="save">
        <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
        </el-form-item>
        
        <el-form-item label="图标">
            <!-- 此处用的elementUI上传图片，用的是自带的Ajax底层请求，所以这里没办法使用axios，需要传递一个:headers:'Authorization'，可在main.js文件中全局加一个方法，此处可直接引用 -->
            <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :headers="getAuthHeaders()"
                :show-file-list="false"
                :on-success="afterUpload"
            >
                <img v-if="model.icon" :src="model.icon" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
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
                    res = await this.$http.put(`rest/items/${this.id}`, this.model)
                } else {
                    // 新建是post
                    res = await this.$http.post('rest/items', this.model)
                }
                // 创建完一个分类后应该跳转至一个分类列表页面
                this.$router.push('/items/list')
                this.$message({ // 添加提示信息，element-ui提供的方法
                    type: 'success',
                    message: '保存成功'
                })
            },
            // 向后端请求接口，获取数据
            async fetch() {
                const res = await this.$http.get(`rest/items/${this.id}`)
                this.model = res.data
            },
            // 图片上传成功之后，将返回的值(服务端会返回一堆数据，其中表示图片地址的)赋给:src="model.icon"，从而<img>就能展示图片了
            afterUpload(res) {
                this.$set(this.model, 'icon', res.url)
                // this.model.icon = res.url; 用这个方法添加属性，vue显示不出来
                // console.log(res);
            }
        },
        created() {
            // 条件判断：如果有id，则输入框显示需要编辑的内容（从服务端返回数据），否则为空
            this.id && this.fetch()
        }
    }
</script>

<style>

</style>