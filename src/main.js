import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 导入全局样式表
import '@/assets/css/global.css'
// 引入elementui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//配置axios网络请求
import axios from 'axios'
//配置请求的根路径
axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'
//配置请求拦截器，为所有请求添加token
axios.interceptors.request.use(config => {
  // console.log(config);
  config.headers.Authorization = window.sessionStorage.getItem('token');

  return config;
})
Vue.prototype.$http = axios


Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
