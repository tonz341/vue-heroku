// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueResource from 'vue-resource'

Vue.config.productionTip = false

Vue.use(VueResource)
/* eslint-disable no-new */

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
