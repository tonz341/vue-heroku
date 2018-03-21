// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueLetterAvatar from 'vue-letter-avatar'
import io from 'socket.io-client'

Vue.config.productionTip = false

/* eslint-disable no-new */

window._= require('lodash');

window.$ = window.jQuery = require('jquery')

require('bootstrap')

// window.Popper = require('./assets/js/popper.min.js')
// require('./assets/js/bootstrap.min.js')

require('./assets/js/jquery-ui.js')

window.socket = io.connect()

window.axios = require('axios')
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

Vue.use(VueLetterAvatar)
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  mounted () {
    this.$store.dispatch('isAuthenticated')
    this.$store.dispatch('API_IMAGES')
    this.$store.dispatch('API_POSTS')
  }
})
