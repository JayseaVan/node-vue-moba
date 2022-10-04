<template>
  <div>
      <!-- begin of swiper -->
      <swiper :options="swiperOption">
        <swiper-slide>
          <img src="../assets/images/swiper1.jpeg" class="w-100">
        </swiper-slide>
        <swiper-slide>
          <img src="../assets/images/swiper2.jpeg" class="w-100">
        </swiper-slide>
        <swiper-slide>
          <img src="../assets/images/swiper3.jpeg" class="w-100">
        </swiper-slide>
        <div class="swiper-pagination pagination-home text-right px-3 pb-1" slot="pagination"></div>
      </swiper>

      <!-- begin of sprite -->
      <div class="nav-icons bg-white mt-3 text-center pt-3">
        <div class="nav-items d-flex flex-wrap">
          <div class="nav-item">
            <i class="sprite sprite-news"></i>
            <div>爆料站</div>
          </div>
          <div class="nav-item">
            <i class="sprite sprite-story"></i>
            <div>故事站</div>
          </div>
          <div class="nav-item">
            <i class="sprite sprite-shop"></i>
            <div>周边商城</div>
          </div>
          <div class="nav-item">
            <i class="sprite sprite-service"></i>
            <div>体验服</div>
          </div>
          <div class="nav-item">
            <i class="sprite sprite-newbird"></i>
            <div>新人专区</div>
          </div>
          <div class="nav-item">
            <i class="sprite sprite-glory"></i>
            <div>荣耀·传承</div>
          </div>
          <div class="nav-item">
            <i class="sprite sprite-kings"></i>
            <div>王者营地</div>
          </div>
          <div class="nav-item">
            <i class="sprite sprite-wechat"></i>
            <div>公众号</div>
          </div>
          <div class="nav-item">
            <i class="sprite sprite-version"></i>
            <div>版本介绍</div>
          </div>
          <div class="nav-item">
            <i class="sprite sprite-environment"></i>
            <div>对局环境</div>
          </div>
          <div class="nav-item">
            <i class="sprite sprite-createplan"></i>
            <div>IP共创计划</div>
          </div>
          <div class="nav-item">
            <i class="sprite sprite-interactive"></i>
            <div>创意互动营</div>
          </div>
        </div>
        <div class="shrink bg-light py-2 fs-sm">
          <i class="sprite sprite-arrow mr-1"></i>
          <span>收起</span>
        </div>
      </div>

      <!-- begin of card -->
      <m-list-card title="新闻资讯" icon="cc-menu-circle" :categories="newsCats">
        <template #items="{category}">
          <router-link 
          tag="div"
          :to="`/articles/${news._id}`"
          class="slide-item fs-lg py-2"
          v-for="news in category.newsList" :key="news.title">
            <a href="javascript:;" class=" d-flex">
              <span class="text-darkblue">[{{news.categoryName}}]</span>
              <span class="px-1">|</span>
              <span class="flex-1 text-dark text-ellipsis">{{news.title}}</span>
              <span class="text-grey-1 fs-sm">{{news.createdAt | date}}</span>
            </a>
          </router-link>
        </template>
      </m-list-card>

      <m-list-card title="英雄列表" icon="Boxing-Helmet" :categories="heroCats">
        <template #items="{category}">
          <div class="slide-item d-flex flex-wrap" style="margin: 0 -0.5rem;">
            <router-link
            tag="div" :to="`/heroes/${hero._id}`"
            class="p-2 text-center"
            v-for="hero in category.heroList" :key="hero._id"
            style="width:20%;">
              <img :src="hero.avatar" class="w-100">
              <div class="">{{hero.name}}</div>
            </router-link>
          </div>
        </template>
      </m-list-card>

      <m-card title="精彩视频" icon="video"></m-card>
      <m-card title="百态王者" icon="king"></m-card>

      
  </div>
</template>

<script>
  import dayjs from 'dayjs'

  export default {
    // 格式化时间
    filters: {
      date(val) {
        return dayjs(val).format('MM/DD')
      }
    },
    data() {
      return {
        navItem: ['爆料站', '故事站'],
        swiperOption: {
          pagination: {
            el: '.pagination-home'
          }
        },
        newsCats:[
          {
            name: '热门',
            newsList: new Array(5).fill({}).map(() => ({
              categoryName: '热门',
              title: "《魂斗罗：归来》全新版本致敬射击精神",
              date: '09/29'
            }))
          },
          {
            name: '新闻',
            newsList: new Array(5).fill({}).map(() => ({
              categoryName: '新闻',
              title: "互动小任务第18期-金秋主题头像框方案票选结果公布",
              date: '09/29'
            }))
          },
          {
            name: '公告',
            newsList: new Array(5).fill({}).map(() => ({
              categoryName: '公告',
              title: "9月30日全服不停机更新公告",
              date: '09/30'
            }))
          },
          {
            name: '活动',
            newsList: new Array(5).fill({}).map(() => ({
              categoryName: '活动',
              title: "【时之奇旅的幸运礼】活动开启公告及FAQ",
              date: '09/29'
            }))
          },
          {
            name: '赛事',
            newsList: new Array(5).fill({}).map(() => ({
              categoryName: '赛事',
              title: "甄姬也能在总决赛登场？世冠南亚区域选拔赛冠军诞生！",
              date: '09/30'
            }))
          },
        ],
        heroCats: [],
        news: [
          {
            title: "《魂斗罗：归来》全新版本致敬射击精神",
            date: '09/29'
          },
          {
            title: "互动小任务第18期-金秋主题头像框方案票选结果公布",
            date: '09/29'
          },
          {
            title: "9月29日全服不停机更新公告",
            date: '09/28'
          },
          {
            title: "背《滕王阁序》免费得弈星新皮肤火热进行中",
            date: '09/27'
          },
          {
            title: "互动小任务第18期-金秋主题头像框票选活动开启！",
            date: '09/26'
          },
        ]
      }
    },
    methods: {
      async fetchNewsCats() {
        const res = await this.$http.get('news/list')
        this.newsCats = res.data
      },
      async fetchHeroCats() {
        const res = await this.$http.get('heroes/list')
        this.heroCats = res.data
      }
    },
    created() {
      this.fetchHeroCats()
      this.fetchNewsCats()
    }
  }
</script>

<style lang='scss'>
  @import '../assets/scss/variable';

  .pagination-home {
    .swiper-pagination-bullet {
      opacity: 1;
      border-radius: 0.1538rem;
      background: map-get($colors, 'white');
      &.swiper-pagination-bullet-active {
        background: map-get($colors, 'darkblue');
      }
    }
  }

  .nav-icons {
    border-top: 1px solid $border-color;
    border-bottom: 1px solid $border-color;
    .nav-item {
      width: 25%;
      margin-bottom: 1rem;
      border-right: 1px solid $border-color;
      &:nth-child(4n) {
        border-right: 1px solid transparent;
      }
    }
  }
</style>