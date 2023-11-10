import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/listPage',
    name: 'listPage',
    component: () => import('../views/listPage.vue')
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('../views/detail.vue')
  },
  {
    path: '/method',
    name: 'method',
    component: () => import('../views/method.vue')
  },
  {
    path: '/winning',
    name: 'winning',
    component: () => import('../views/winning.vue')
  },
  {
    path: '/NxNgVplL9P8v_20221227',
    name: 'NxNgVplL9P8v_20221227',
    component: () => import('../views/NxNgVplL9P8v_20221227.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
