<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2, h4 {
  font-weight: normal;
  color: black
}

a {
  color: #42b983;
}
ul {
  list-style-type: none;
  padding: 0;
}
.chat-message {
    background: lightsteelblue;
    border-radius: 7px;
    padding-left: 5px;
    margin-left: 40px;
    margin-top: -41px;
}

.chat-box {
    min-height: 300px;
    padding: 5px;
    max-height: 300px;
    overflow-y: scroll;
}

#chat-box::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	background-color: #F5F5F5;
}

#chat-box::-webkit-scrollbar
{
	width: 10px;
	background-color: #F5F5F5;
}

#chat-box::-webkit-scrollbar-thumb
{
	background-color: lightgray;
	border: 2px solid darkgray;
}

.chat-date {
    font-size: 8px;
    /* margin-bottom: 0px;
    margin-top: 5px;
    margin-left: 43px; */
}

.margin-bot {
  margin-bottom: 5px
}
</style>

<template>
    <div id="chat">
          <h4>Leave a message </h4>
          <div class="row">
            <div class="col-md-12">
                <ul class="chat-box" id="chat-box">
                  <li class="margin-bot" v-for="message in myMessages" :key="message._id">
                        <vue-letter-avatar name='user' size='35' :rounded='true'/>
                        <div class="chat-message">
                          <strong>User</strong> : {{ message.message }}
                          <p class="chat-date">{{ convertTimestampFromId(message._id) }}</p>
                        </div>
                  </li>
                </ul>
              </div>
              <div class="col-md-12">
                <div class="input-group">
                  <input type="text" class="form-control" placeholder="Type your message here" aria-label="Type your message here" v-model="message" @keypress.13.prevent="sendMessage">
                  <span class="input-group-btn">
                    <button class="btn btn-success" type="button" @click="sendMessage"><i class="fa fa-send"></i></button>
                  </span>
                </div>
              </div>
          </div>
        </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'contact',
  data () {
    return {
      message: ''
    }
  },
  computed: {
    ...mapGetters({
      myMessages: 'getMessages',
      currentUser: 'getUser'
    })
  },
  mounted () {
    this.$store.dispatch('API_CHATS')

    window.socket.on('global-chat:send-clients', (message) => {
      this.$store.commit('INSERT_MESSAGES', message)
    }) // listener from server

    // this.$store.commit('INSERT_MESSAGES', {
    //   datetime :null, message:"hahaha", user:"anonymous", __v:0, _id:"5ab1de034779a700146cb11c"
    // })
    //  this.$store.commit('INSERT_MESSAGES', {
    //   datetime :null, message:"hahaha", user:"anonymous", __v:0, _id:"5ab1de034779a700146cb11c"
    // })
    //  this.$store.commit('INSERT_MESSAGES', {
    //   datetime :null, message:"hahaha", user:"anonymous", __v:0, _id:"5ab1de034779a700146cb11c"
    // })
    //   this.$store.commit('INSERT_MESSAGES', {
    //   datetime :null, message:"hahaha", user:"anonymous", __v:0, _id:"5ab1de034779a700146cb11c"
    // })
    //   this.$store.commit('INSERT_MESSAGES', {
    //   datetime :null, message:"hahaha", user:"anonymous", __v:0, _id:"5ab1de034779a700146cb11c"
    // })
    //   this.$store.commit('INSERT_MESSAGES', {
    //   datetime :null, message:"hahaha", user:"anonymous", __v:0, _id:"5ab1de034779a700146cb11c"
    // })
  },
  methods: {
    sendMessage () {
      window.socket.emit('global-chat:send-server', this.message)
      this.message = null
    },
    convertTimestampFromId (id) {
      let date = new Date(parseInt(id.toString().substring(0, 8), 16) * 1000)
      return date.toLocaleDateString('en-US') + ' ' + date.toLocaleTimeString('en-US')
    }
  },
  watch: {
    myMessages () {
      this.$nextTick(function () {
        let objDiv = document.getElementById('chat-box')

        let x=objDiv.scrollTop;
        while(x<objDiv.scrollHeight) {
          objDiv.scrollTop = x
          x++
        }
      })
    }
  }
}
</script>

