<template>
    <div class="page-article" v-if="model.title">
        <div class="d-flex py-3 px-2 border-bottom">
            <i class="iconfont text-lightblue" @click="backPage">&#xf016f;</i>
            <strong class="title flex-1 text-ellipsis pr-4 text-lightblue">{{model.title}}</strong>
            <div class="text-grey fs-xs">2022-09-29</div>
        </div>
        <div v-html="model.body" class="body px-3 fs-xl"></div>
        <div class="related-news border-top px-2 py-3">
            <div class="d-flex ai-center">
                <i class="iconfont icon-cc-menu-circle"></i>
                <strong class="pl-1 text-lightblue">相关资讯</strong>
            </div>
            <div>
                <router-link class="pt-2" :to="`/articles/${item._id}`" tag="div" v-for="item in model.related" :key="item._id">{{item.title}}</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            id: { required: true }
        },
        data() {
            return {
                model: null,
            }
        },
        methods: {
            async fetch() {
                const res = await this.$http.get(`/articles/${this.id}`)
                this.model = res.data
            },
            backPage() {
                this.$router.push('/')
            }
        },
        created() {
            this.fetch()
        },
        watch: {
            // 监听id，当id变化时，执行 this.fetch()
            id: 'fetch',
            /* id() {
                this.fetch()
            } */
        },
    }
</script>

<style lang="scss">
    .page-article {
        .body {
            img {
                max-width: 100%;
                height: auto;
            }
            iframe {
                width: 100%;
                height: auto;
            }
        }
    }
</style>