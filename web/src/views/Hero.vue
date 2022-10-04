<template>
    <div class="page-hero" v-if="model">
        <div class="topbar bg-black py-2 px-3 d-flex ai-center text-white">
            <img src="../assets/logo.png" height="30">
            <div class="text-white px-3">王者荣耀</div>
            <div class="flex-1">攻略站</div>
            <router-link to="/" tag="div" class="">更多英雄 &gt;</router-link>
        </div>

        <div class="banner" :style="{'background-image': `url(${model.banner})`}">
            <div class="info text-white p-3 d-flex flex-column jc-end h-100">
                <div class="fs-sm">{{model.title}}</div>
                <h2 class="my-2">{{model.name}}</h2>
                <div class="fs-sm">{{model.categories.map(v => v.name).join('/')}}</div>
                <div class="d-flex jc-between pt-2">
                    <div class="scores d-flex ai-center" v-if="model.scores">
                        <span>难度</span>
                        <span class="badge bg-difficult">{{model.scores.difficult}}</span>
                        <span>技能</span>
                        <span class="badge bg-skill">{{model.scores.skills}}</span>
                        <span>攻击</span>
                        <span class="badge bg-attack">{{model.scores.attack}}</span>
                        <span>生存</span>
                        <span class="badge bg-survive">{{model.scores.survive}}</span>
                    </div>
                    <router-link
                    :to="{name: 'skin'}"
                    tag="div"
                    class="text-grey fs-sm"
                    @click="sendMessage"
                    >皮肤：{{model.skins.length}} &gt;</router-link>
                </div>
            </div>
        </div>

        <div class="main">
            <div class="px-3 bg-white">
                <div class="nav d-flex jc-around pt-3 pb-2 border-bottom">
                    <div class="nav-item active">
                        <div class="nav-link">英雄初识</div>
                    </div>
                    <div class="nav-item">
                        <div class="nav-link">进阶攻略</div>
                    </div>
                </div>
            </div>
            <swiper>
                <swiper-slide>
                    <div>
                        <!-- 技能 -->
                        <div class="p-3 bg-white border-bottom">
                            <!-- button -->
                            <div class="d-flex">
                                <router-link to="/" tag="button" class="btn btn-lg flex-1">
                                    <i class="iconfont icon-video"></i>
                                    <span>英雄介绍视频</span>
                                </router-link>
                                <router-link to="/" tag="button" class="btn btn-lg flex-1 ml-2">
                                    <i class="iconfont icon-king"></i>
                                    <span>一图识英雄</span>
                                </router-link>
                            </div>

                            <!-- skills -->
                            <div class="skills mt-4">
                                <div class="d-flex jc-around">
                                    <img
                                    class="icon"
                                    @click="currentSkillIndex = i"
                                    :class="{active: currentSkillIndex === i}"
                                    :src="item.icon"
                                    v-for="(item, i) in model.skills"
                                    :key="item.name"
                                    width="65" height="65">
                                </div>
                                <div v-if="currentSkill" class="mt-2">
                                    <div class="d-flex ai-center">
                                        <h3 class="mr-5">{{currentSkill.name}}</h3>
                                        <span class="text-grey">
                                            (冷却值：{{currentSkill.delay}} 消耗：{{currentSkill.cost}})
                                        </span>
                                    </div>
                                    <div>{{currentSkill.description}}</div>
                                </div>
                            </div>
                        </div>

                        <!-- 出装推荐 -->
                        <m-card plain class="hero-items" title="出装推荐" icon="cc-menu-circle">
                            <div class="fs-xl pb-3">顺风出装</div>
                            <div class="d-flex jc-between border-bottom text-center">
                                <div
                                v-for="item in model.items1"
                                :key="item.name">
                                    <img :src="item.icon" class="icon">
                                    <div class="fs-sm">{{item.name}}</div>
                                </div>
                            </div>

                            <div class="fs-xl py-3">逆风出装</div>
                            <div class="d-flex jc-between text-center">
                                <div
                                v-for="item in model.items2"
                                :key="item.name">
                                    <img :src="item.icon" class="icon">
                                    <div class="fs-sm">{{item.name}}</div>
                                </div>
                            </div>
                        </m-card>

                        <m-card plain title="使用技巧" icon="cc-menu-circle">
                            <p class="m-0">{{model.usageTips}}</p>
                        </m-card>

                        <m-card plain title="对抗技巧" icon="cc-menu-circle">
                            <p class="m-0">{{model.battleTips}}</p>
                        </m-card>

                        <m-card plain title="团战思路" icon="cc-menu-circle">
                            <p class="m-0">{{model.teamTips}}</p>
                        </m-card>

                        <m-card plain title="英雄关系" icon="cc-menu-circle">
                            <div class="fs-xl">最佳搭档</div>
                            <div class="d-flex" v-for="partner in model.partners" :key="partner.name">
                                <img :src="partner.hero.avatar" width="50" height="50" class="mr-3 mt-3">
                                <p class="m-0 mt-3">{{partner.description}}</p>
                            </div>
                            <div class="border-bottom mt-3"></div>
                        </m-card>
                    </div>
                </swiper-slide>
                <swiper-slide></swiper-slide>
            </swiper>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            id: { required: true },
        },
        data() {
            return {
                model: null,
                currentSkillIndex: 0,
            }
        },
        computed: {
            currentSkill() {
                return this.model.skills[this.currentSkillIndex]
            }
        },
        methods: {
            async fetch() {
                // 一开始忘记写await，数据一直出不来！！！
                const res = await this.$http.get(`/heroes/${this.id}`)
                this.model = res.data
            },
            sendMessage() {
                this.$bus.$emit('model', this.model)
                console.log(this.model)
            }
        },
        created() {
            this.fetch()
        },
    }
</script>

<style lang="scss">
    @import '../assets/scss/variable';
    .page-hero {
        .banner {
            height: 50vw;
            background: #fff no-repeat top center;
            background-size: auto 100%;
        }
        .info {
            background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1));
            .scores {
                .badge {
                    margin: 0 0.25rem;
                    display: inline-block;
                    width: 1rem;
                    height: 1rem;
                    text-align: center;
                    line-height: 0.9rem;
                    border-radius: 50%;
                    font-size: 0.6rem;
                    border: 1px solid rgba(255,255,255,.2);
                }
            }
        }
        .skills {
            img.icon {
                border: 3px solid map-get($colors, 'white');
                &.active {
                    border-color: map-get($colors, 'primary');
                }
                border-radius: 50%;
            }
        }
        .hero-items {
            img.icon {
                border-radius: 50%;
                width: 48px;
                height: 48px;
            }
        }
    }
</style>