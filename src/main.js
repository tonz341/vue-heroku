// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false
/* eslint-disable no-new */

window.axios = require('axios')
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  mounted () {
    window.socket.on('global-chat:send-clients', (message) => {
      this.$store.commit('INSERT_MESSAGES', message)
    })
    this.$store.dispatch('API_IMAGES')
    this.$store.dispatch('API_POSTS')
  }
})
