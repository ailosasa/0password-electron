import Vue from 'vue'
import iView from 'iview'
import axios from 'axios'
import qs from 'qs'
/* import VCharts from 'v-charts' */
import 'iview/dist/styles/iview.css'

import App from './App'
import router from './router'
import store from './store'
import extend from './extend'
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(element)
Vue.use(extend)
Vue.use(iView)

Vue.prototype.$axios = axios // 全局注册，使用方法为:this.$axios
axios.defaults.adapter = require('axios/lib/adapters/http')
axios.defaults.headers.post['Content-Type'] = 'application/json'
Vue.prototype.qs = qs // 全局注册，使用方法为:this.qs
/* Vue.use(VCharts) */
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  next()
})

router.afterEach((to, from, next) => {
  iView.LoadingBar.finish()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
