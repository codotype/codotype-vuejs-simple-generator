import Vue from 'vue'
import Meta from 'vue-meta'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import Toasted from 'vue-toasted'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

// register Vue toasted plugin
Vue.use(Toasted)

// vue-meta
// supports `meta` object returned with `module.defaults`
Vue.use(Meta)

// Buefy
// Bulma components for Vue.js
Vue.use(Buefy)

Vue.config.productionTip = false

new Vue({
  store,
  router: router,
  render: h => h(App)
}).$mount('#app')
