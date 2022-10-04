<template>
    <div class="about">
        <!-- 条件判断，如果有id，则显示'编辑分类' -->
      <h1>{{id ? '编辑' : '新建'}}文章</h1>
      <el-form label-width="120px" @submit.native.prevent="save">
        <el-form-item label="所属文章">
            <el-select v-model="model.categories" multiple>
                <el-option v-for="item in categories" :key="item._id"
                :label="item.name" :value="item._id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="标题">
            <el-input v-model="model.title"></el-input>
        </el-form-item>
        <el-form-item label="详情">
            <!-- vue-editor 富文本编辑器 -->
            <vue-editor
                useCustomImageHandler
                @image-added="handleImageAdded" 
                v-model="model.body"
            ></vue-editor>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
    // 引入 vue2-editor 富文本编辑器
    // https://www.npmjs.com/package/vue2-editor
    import { VueEditor } from "vue2-editor";

    export default {
        data() {
            return {
                model: {},
                categories: []
            }
        },
        // 添加 vue2-editor 子组件
        components: {
            VueEditor
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
                    res = await this.$http.put(`rest/articles/${this.id}`, this.model)
                } else {
                    // 新建是post
                    res = await this.$http.post('rest/articles', this.model)
                }
                // 创建完一个分类后应该跳转至一个分类列表页面
                this.$router.push('/articles/list')
                this.$message({ // 添加提示信息，element-ui提供的方法
                    type: 'success',
                    message: '保存成功'
                })
            },
            // 向后端请求接口，获取数据
            async fetch() {
                const res = await this.$http.get(`rest/articles/${this.id}`)
                this.model = res.data
            },
            // 向后端请求接口，获取父级选项数据
            async fetchCategories() {
                const res = await this.$http.get(`rest/categories`)
                this.categories = res.data
            },
            
            // 富文本编辑器，插入图片方法
            async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
                // An example of using FormData
                // NOTE: Your key could be different such as:
                // formData.append('file', file)

                // 上传文件，需要使用FormData提交表单数据 (FormData()是HTML5自带的一种数据接口)
                // FormData 接口提供了一种表示表单数据的键值对 key/value 的构造方式，并且可以轻松的将数据通过XMLHttpRequest.send() 方法发送出去
                const formData = new FormData();
                formData.append("file", file);

                const res = await this.$http.post("upload", formData);
                Editor.insertEmbed(cursorLocation, "image", res.data.url);
                resetUploader();
            }
        },
        created() {
            this.fetchCategories()
            // 条件判断：如果有id，则输入框显示需要编辑的内容（从服务端返回数据），否则为空
            this.id && this.fetch()
        },

    }
</script>  