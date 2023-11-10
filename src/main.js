import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vuetify from './plugins/vuetify'
import VueAnalytics from 'vue-analytics' //ga
import VueGtag from 'vue-gtag'
import MyPlugin from './lib/Myplugin'
// import swal from 'sweetalert2'
require('swiper/dist/css/swiper.css')
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper)
Vue.use(MyPlugin)
Vue.use(VueAxios, axios);
Vue.use(VueGtag, {
  config: {
    id: 'G-286TB7K3YY',
    debug_mode: true
  } // 这里修改为你的gtag id，应该是G开头的。
});

Vue.use(VueAnalytics, {
  id: 'G-286TB7K3YY',
  router,
  checkDuplicatedScript: true //檢測 html 中是否已經添加了分析腳本
})
Vue.prototype.$childMethod = new Vue();



new Vue({
  router,
  store,
  axios,
  vuetify,
  VueGtag,
  VueAnalytics,
  // swal,
  VueAxios,
  render: h => h(App)
}).$mount('#app')