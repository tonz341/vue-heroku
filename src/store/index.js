import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    index: 0,
    items: [],
    images: [],
    messages: []
  },
  getters: {
    // ...
    imagesLength: (state, getters) => {
      return state.images.length
    },
    getMessages: state => state.messages
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
    },
    INITIATE_CHATS (state, message) {
      state.messages = message.reverse()
    },
    INSERT_MESSAGES (state, message) {
      state.messages.push({'_id': 0, 'user': 'anonymous', 'message': message, 'datetime': null})
    }
  },
  actions: {
    insertImage ({ commit, getters }, payload) {
      commit('INSERT_IMAGE', {id: getters.imagesLength + 1, src: payload.src, title: '2nd pic', definition: 'Lorem ipsam'})
    },
    API_IMAGES ({ commit, getters }) {
      window.axios.get('/api/images/all')
      .then((response) => {
        commit('FETCH_IMAGE', response.data)
      })
      .catch(error => {
        console.log(error.statusText)
      })
    },
    API_POSTS ({ commit, getters }) {
      window.axios.get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        commit('FETCH_USERS', response.data)
      })
      .catch(error => {
        console.log(error.statusText)
      })
    },
    API_CHATS ({ commit, getters }) {
      window.axios.get('/api/chats/all')
      .then((response) => {
        commit('INITIATE_CHATS', response.data)
      })
      .catch(error => {
        console.log(error.statusText)
      })
    }
  }
})
