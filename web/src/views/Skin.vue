<template>
    <div class="bg-white">
        <div class="topbar bg-black py-2 px-3 d-flex ai-center">
            <img src="../assets/logo.png" height="30">
            <div class="px-2 flex-1">
                <div class="text-white">王者荣耀</div>
                <div class="text-grey-1 fs-xxs">团队成就更多</div>
            </div>
            <button type="button" class="btn bg-primary">立即下载</button>
        </div>
        <swiper :options="swiperOption" v-if="model">
            <swiper-slide
            v-for="item in model.skins"
            :key="item.title"
            class="text-center">
                <img :src="item.image" class="w-100">
                <div class="mt-3 pb-4 mb-2">{{item.title}}</div>
            </swiper-slide>
            <div class="swiper-pagination pagination-skin" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
    export default {
        props: {
            id: { required: true }
        },
        data() {
            return {
                model: [],
                swiperOption: {
                    pagination: {
                        el: '.swiper-pagination'
                    },
                }
            }
        },
        methods: {
            async fetchSkins() {
                const res = await this.$http.get(`/heroes/${this.id}`)
                console.log(res.data)
                this.model = res.data
            }
        },
        created() {
            this.fetchSkins()
        },
    }
</script>

<style lang="scss">
@import '../assets/scss/variable';

.pagination-skin {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    width: .75rem;
    height: .35rem;
    background: map-get($colors, 'grey-0');
    &.swiper-pagination-bullet-active {
      width: 1.1rem;
      background: map-get($colors, 'dark');
    }
  }
}
.swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet {
    margin: 0 2px;
}
</style>