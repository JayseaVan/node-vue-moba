<template>
    <div class="about">
        <!-- 条件判断，如果有id，则显示'编辑分类' -->
      <h1 style="margin-bottom: 1rem;">{{id ? '编辑' : '新建'}}英雄</h1>
      <el-form label-width="120px" @submit.native.prevent="save">
        <el-tabs type="border-card" value="basic">
            <el-tab-pane label="基础信息" name="basic">
                <el-form-item label="名称">
                    <el-input v-model="model.name"></el-input>
                </el-form-item>
        
                <el-form-item label="头像">
                    <el-upload
                        class="avatar-uploader"
                        :action="uploadUrl"
                        :headers="getAuthHeaders()"
                        :show-file-list="false"
                        :on-success="res => $set(model, 'avatar', res.url)"
                    >
                        <img v-if="model.avatar" :src="model.avatar" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>

                <el-form-item label="banner">
                    <el-upload
                        class="banner-uploader"
                        :action="uploadUrl"
                        :headers="getAuthHeaders()"
                        :show-file-list="false"
                        :on-success="res => $set(model, 'banner', res.url)"
                    >
                        <img v-if="model.banner" :src="model.banner" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                
                <el-form-item label="称号">
                    <el-input v-model="model.title"></el-input>
                </el-form-item>
                
                <el-form-item label="类型">
                    <el-select v-model="model.categories" multiple>
                        <el-option v-for="item of categories"
                        :key="item._id"
                        :label="item.name"
                        :value="item._id"></el-option>
                    </el-select>
                </el-form-item>
        
                <el-form-item label="难度">
                    <el-rate style="margin-top: 0.6rem;" :max="9" show-score v-model="model.scores.difficult"></el-rate>
                </el-form-item>
                <el-form-item label="技能">
                    <el-rate style="margin-top: 0.6rem;" :max="9" show-score v-model="model.scores.skills"></el-rate>
                </el-form-item>
                <el-form-item label="攻击">
                    <el-rate style="margin-top: 0.6rem;" :max="9" show-score v-model="model.scores.attack"></el-rate>
                </el-form-item>
                <el-form-item label="生存">
                    <el-rate style="margin-top: 0.6rem;" :max="9" show-score v-model="model.scores.survive"></el-rate>
                </el-form-item>

                <el-form-item label="皮肤">
                    <el-input type="number" v-model="model.skin"></el-input>
                </el-form-item>
        
                <el-form-item label="顺风出装">
                    <el-select v-model="model.items1" multiple>
                        <el-option v-for="item of items"
                        :key="item._id"
                        :label="item.name"
                        :value="item._id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="逆风出装">
                    <el-select v-model="model.items2" multiple>
                        <el-option v-for="item of items"
                        :key="item._id"
                        :label="item.name"
                        :value="item._id"></el-option>
                    </el-select>
                </el-form-item>
        
                <el-form-item label="使用技巧">
                    <el-input type="textarea" v-model="model.usageTips"></el-input>
                </el-form-item>
                <el-form-item label="对抗技巧">
                    <el-input type="textarea" v-model="model.battleTips"></el-input>
                </el-form-item>
                <el-form-item label="团战思路">
                    <el-input type="textarea" v-model="model.teamTips"></el-input>
                </el-form-item>
            </el-tab-pane>

            <el-tab-pane label="技能" name="skills">
                <el-button size="small" @click="model.skills.push({})"> <i class="el-icon-plus"></i> 添加技能</el-button>
                <el-row style="flex-wrap: wrap;">
                    <el-col :md="12" v-for="(item, i) in model.skills" :key="i">
                        <el-form-item label="名称">
                            <el-input v-model="item.name"></el-input>
                        </el-form-item>

                        <el-form-item label="图标">
                            <el-upload
                                class="avatar-uploader"
                                :action="uploadUrl"
                                :headers="getAuthHeaders()"
                                :show-file-list="false"
                                :on-success="res => $set(item, 'icon', res.url)"
                            >
                                <img v-if="item.icon" :src="item.icon" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>

                        <el-form-item label="冷却值">
                            <el-input v-model="item.delay"></el-input>
                        </el-form-item>

                        <el-form-item label="消耗">
                            <el-input v-model="item.cost"></el-input>
                        </el-form-item>

                        <el-form-item label="描述">
                            <el-input type="textarea" v-model="item.description"></el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-button size="small" type="danger"
                            @click="model.skills.splice(i, 1)">删除</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-tab-pane>

            <el-tab-pane label="最佳搭档" name="partners">
                <el-button size="small" @click="model.partners.push({})"> <i class="el-icon-plus"></i> 添加英雄</el-button>
                <el-row style="flex-wrap: wrap;">
                    <el-col :md="12" v-for="(item, i) in model.partners" :key="i">
                        <el-form-item label="英雄">
                            <el-select filterable v-model="item.hero">
                                <el-option
                                    v-for="hero in heroes"
                                    :key="hero._id"
                                    :value="hero._id"
                                    :label="hero.name"
                                ></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="描述">
                            <el-input type="textarea" v-model="item.description"></el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-button size="small" type="danger"
                            @click="model.partners.splice(i, 1)">删除</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-tab-pane>

            <el-tab-pane label="皮肤" name="skins">
                <el-button size="small" @click="model.skins.push({})"> <i class="el-icon-plus"></i> 添加皮肤</el-button>
                <el-row style="flex-wrap: wrap;">
                    <el-col :md="12" v-for="(item, i) in model.skins" :key="i">
                        <el-form-item label="称号">
                            <el-input v-model="item.title"></el-input>
                        </el-form-item>

                        <el-form-item label="皮肤图像">
                            <el-upload
                                class="avatar-uploader"
                                :action="uploadUrl"
                                :headers="getAuthHeaders()"
                                :show-file-list="false"
                                :on-success="res => $set(item, 'image', res.url)"
                            >
                                <img v-if="item.image" :src="item.image" class="skin-image">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>

                        <el-form-item>
                            <el-button size="small" type="danger"
                            @click="model.skins.splice(i, 1)">删除</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-tab-pane>
        </el-tabs>

        <el-form-item style="margin-top: 1rem;">
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
                    name: '',
                    avatar: '',
                    scores: {
                        difficult: 0
                    },
                    skills: [],
                    partners: [],
                    heroes: [],
                    skins: [],
                },
                categories: [], // (角色)类型
                items: [], // 装备
                
            }
        },
        props: {
            // 接收id
            id: {}
        },
        methods: {
            // 图片上传成功之后，将返回的值(服务端会返回一堆数据，其中表示图片地址的)赋给:src="model.icon"，从而<img>就能展示图片了
            /* afterUpload(res) {
                // this.$set(this.model, 'avatar', res.url)
                // this.model.avatar = res.url; 
                // console.log(res);
            }, */

            // 将数据发送至服务器
            async save() {
                let res  // 这一步声明不能省略，否则会报错
                if (this.id) {
                    // 编辑是put
                    res = await this.$http.put(`rest/heroes/${this.id}`, this.model)
                } else {
                    // 新建是post
                    res = await this.$http.post('rest/heroes', this.model)
                }
                // 创建完一个分类后应该跳转至一个分类列表页面
                this.$router.push('/heroes/list')
                this.$message({ // 添加提示信息，element-ui提供的方法
                    type: 'success',
                    message: '保存成功'
                })
            },
            // 向后端请求接口，获取数据
            async fetch() {
                const res = await this.$http.get(`rest/heroes/${this.id}`)
                this.model = Object.assign({}, this.model, res.data)
            },

            // 向后端请求接口，获取类型数据
            async fetchCategories() {
                const res = await this.$http.get(`rest/categories`)
                // Object.assign() 方法将所有可枚举（Object.propertyIsEnumerable() 返回 true）的自有（Object.hasOwnProperty() 返回 true）属性从一个或多个源对象复制到目标对象，返回修改后的对象。
                this.categories = res.data
            },

            // 向后端请求接口，获取装备数据
            async fetchItems() {
                const res = await this.$http.get(`rest/items`)
                // Object.assign() 方法将所有可枚举（Object.propertyIsEnumerable() 返回 true）的自有（Object.hasOwnProperty() 返回 true）属性从一个或多个源对象复制到目标对象，返回修改后的对象。
                this.items = res.data
            },

            // 向后端请求接口，获取英雄数据
            async fetchHeroes() {
                const res = await this.$http.get(`rest/heroes`)
                // Object.assign() 方法将所有可枚举（Object.propertyIsEnumerable() 返回 true）的自有（Object.hasOwnProperty() 返回 true）属性从一个或多个源对象复制到目标对象，返回修改后的对象。
                this.heroes = res.data
            },
            
        },
        created() {
            this.fetchCategories()
            this.fetchItems()
            this.fetchHeroes()
            // 条件判断：如果有id，则输入框显示需要编辑的内容（从服务端返回数据），否则为空
            this.id && this.fetch()
        }
    }
</script>

<style>
    .skin-image {
        max-width: 100px;
        height: auto;
    }

</style>