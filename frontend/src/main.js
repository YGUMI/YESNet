// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import './plugins/element.js'
import router from './router'
import VShowSlide from 'v-show-slide'
import axios from 'axios'
import VueSession from 'vue-session'

Vue.prototype.$http = axios
Vue.config.productionTip = false

var options = {
  persist: true
}
Vue.use(VueSession, options)

Vue.use(VShowSlide)

Vue.prototype.$EventBus = new Vue()
Vue.prototype.$EventStatus = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
