import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    // name: 'login',
    component: Login // () => import('../components/Login.vue')
  },
  {
    path: '/home',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if(to.path === '/login') return next()
  // 获取token
  const token = window.sessionStorage.getItem('token')
  if(!token) return next('/login')
  next()
})

export default router
