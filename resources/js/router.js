import Vue from 'vue'
import VueRouter from 'vue-router'

import PhotoList from './pages/PhotoList.vue'
import Login from './pages/login.vue'
import SystemError from './pages/errors/System.vue'

import store from './store'

//VueRouterを呼び出す
Vue.use(VueRouter)

//routesでルートと使用するcomponentを指定する
const routes = [
  {
    path: '/',
    component: PhotoList
  },
  {
    path: '/login',
    component: Login,
    beforeEnter(to,from,next){
      if(store.getters['auth/check']){
        next('/')
      }else{
        next()
      }
    }
  },
  {
    path:'/500',
    component: SystemError
  }
]

// VueRouterインスタンスを作成しroutesを渡す

const router = new VueRouter({
  //アドレスから#が消える
  mode: 'history',
  //routes:routesの短縮形
  routes
})

export default router