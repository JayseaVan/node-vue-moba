<template>
    <div class="about">
        <!-- 条件判断，如果有id，则显示'编辑分类' -->
      <h1>{{id ? '编辑' : '新建'}}广告位</h1>
      <el-form label-width="120px" @submit.native.prevent="save">
        <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
        </el-form-item>
        <el-form-item label="广告">
            <el-button size="small" @click="model.items.push({})"> <i class="el-icon-plus"></i> 添加广告</el-button>
            <el-row style="flex-wrap: wrap;">
                <el-col :md="24" v-for="(item, i) in model.items" :key="i">
                    <el-form-item label="标题" style="margin-bottom: 1rem;">
                        <el-input v-model="item.title"></el-input>
                    </el-form-item>

                    <el-form-item label="跳转链接(URL)" style="margin-bottom: 1rem;">
                        <el-input v-model="item.url"></el-input>
                    </el-form-item>

                    <el-form-item label="图片">
                        <el-upload
                            class="avatar-uploader"
                            :action="$http.defaults.baseURL + '/upload'"
                            :show-file-list="false"
                            :on-success="res => $set(item, 'image', res.url)"
                        >
                            <img v-if="item.image" :src="item.image" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>

                    <el-form-item>
                        <el-button size="small" type="danger"
                        @click="model.items.splice(i, 1)">删除</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
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
                model: {
                    items: [],
                },
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
                    res = await this.$http.put(`rest/ads/${this.id}`, this.model)
                } else {
                    // 新建是post
                    res = await this.$http.post('rest/ads', this.model)
                }
                // 创建完一个分类后应该跳转至一个分类列表页面
                this.$router.push('/ads/list')
                this.$message({ // 添加提示信息，element-ui提供的方法
                    type: 'success',
                    message: '保存成功'
                })
            },
            // 向后端请求接口，获取数据
            async fetch() {
                const res = await this.$http.get(`rest/ads/${this.id}`)
                this.model = Object.assign({}, this.model, res.data)
            },
        },
        created() {
            // 条件判断：如果有id，则输入框显示需要编辑的内容（从服务端返回数据），否则为空
            this.id && this.fetch()
        }
    }
</script>  