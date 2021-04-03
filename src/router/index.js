import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    //路由懒加载
    component: () => import('@/views/login/Login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    //路由懒加载
    component: () => import('@/views/home/Home.vue')
  }
]

const router = new VueRouter({
  routes
})

//挂载路由导航守卫,控制访问权限
router.beforeEach((to,form, next) => {
  //to 要访问的的路径；form 代表从哪个路径跳转而来 ； next 是一个函数，表示放行
  if (to.path === '/login') return next();
  //获取token
  const tokenStr = window.sessionStorage.getItem('token');
  if(!tokenStr) return next('.login');
  next();
})

export default router
