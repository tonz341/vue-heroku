import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    index: 0,
    items: [],
    images: []
  },
  getters: {
    // ...
    imagesLength: (state, getters) => {
      return state.images.length
    }
  },
  mutations: {
    increment (state) {
      state.count++
    },
    decrement (state) {
      state.count--
    },
    INSERT_IMAGE (state, payload) {
      state.images.push(payload)
    },
    FETCH_IMAGE (state, payload) {
      state.images = payload
    },
    FETCH_USERS (state, payload) {
      state.items.push(payload)
    }
  },
  actions: {
    insertImage ({ commit, getters }, payload) {
      commit('INSERT_IMAGE', {id: getters.imagesLength + 1, src: payload.src, title: '2nd pic', definition: 'Lorem ipsam'})
    },
    API_IMAGES ({ commit, getters }) {
      Vue.http.get('https://jsonplaceholder.typicode.com/photos?albumId=1')
      .then((response) => {
        commit('FETCH_IMAGE', response.body)
      })
      .catch(error => {
        console.log(error.statusText)
      })
    },
    API_POSTS ({ commit, getters }) {
      Vue.http.get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        commit('FETCH_USERS', response.body)
      })
      .catch(error => {
        console.log(error.statusText)
      })
    }
  }
})
