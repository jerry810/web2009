import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/common.css'
import './router/permission'
import './utils/init'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import api from './api'
Vue.prototype.$api=api;/* 将网络请求挂载到顶级 */
import EventBus from './utils/eventBus'
Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
