import Vue from 'vue'
import App from './App.vue'
import router from "../src/router/index"
import store from "./store"

import fastClick from "fastclick"
import VueLazyLoad from "vue-lazyload"
import toast from "components/common/toast/index"

Vue.config.productionTip = false
Vue.prototype.$bus=new Vue()
Vue.use(toast)
Vue.use(VueLazyLoad,{
  loading:require("assets/img/common/loading.gif")
})

fastClick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
