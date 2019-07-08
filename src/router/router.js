import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Main from '@/views/common/Main.vue'

Vue.use(Router)

const gloalRouter = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/common/Login.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/common/404.vue')
  }
]
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: gloalRouter.concat([
    {
      path: '/',
      name: 'main',
      redirect: '/home',
      component: Main,
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home
        }
      ]
    }
  ])
})
