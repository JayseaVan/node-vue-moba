import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Home from '../views/Home.vue'
import Article from '../views/Article.vue'
import Hero from '../views/Hero.vue'
// import Skin from '../views/Skin.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Main,
    children: [
      { path: '/', name: 'home', component: Home },
      // props: true 表示，所有在 path 中传递的参数 ':id'，都可以映射为组件参数，可以被该组件使用
      { path: '/articles/:id', name: 'article', component: Article, props: true },
    ]
  },
  { path: '/heroes/:id', name: 'hero', component: Hero, props: true,
  },
  { path: '/heroes/skin/:id', name: 'skin', component: () => import('../views/Skin.vue'), props: true},
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
