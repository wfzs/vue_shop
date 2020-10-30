import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式表
import '../src/assets/css/global.css'
import '../src/assets/fonts/iconfont.css'
import TreeTable from 'vue-table-with-tree-grid'
// 导入富文本编辑
import VueQuillEditor from 'vue-quill-editor'
// 导入富文本编辑样式
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

import axios from 'axios'
axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error)
})
Vue.prototype.$https = axios

Vue.config.productionTip = false

Vue.component('tree-table', TreeTable)
Vue.use(VueQuillEditor)

Vue.filter('dateFormat', function(time) {
  const dt = new Date(time)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
