<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
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
    padding: 5px;
    margin-left: 5px;
}

.chat-box {
    min-height: 100px;
    padding: 5px;
    max-height: 400px;
    overflow-y: scroll;
}

.chat-date {
    font-size: 8px;
    margin-bottom: 0px;
    margin-top: 5px;
    margin-left: 43px;
}
</style>

<template>
  <div>
    <section id="contact">
    <div class="container">
      <div class="row">
        <div class="col-md-12 text-center">
          <!-- <h2 class="section-title">Contact Us</h2> -->
        </div>
      </div>
      <br>
      <div class="row"> 
        <!-- <div class="col-md-6">
          <h4>Email</h4>
          <div class="form">
            <div id="sendmessage">Your message has been sent. Thank you!</div>
            <div id="errormessage"></div>
            <form action="" method="post" role="form" class="contactForm">
              <div class="form-group">
                <input type="text" name="name" class="form-control" id="name" placeholder="Your Name" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                <div class="validation"></div>
              </div>
              <div class="form-group">
                <input type="email" class="form-control" name="email" id="email" placeholder="Your Email" data-rule="email" data-msg="Please enter a valid email" />
                <div class="validation"></div>
              </div>
              <div class="form-group">
                <input type="text" class="form-control" name="subject" id="subject" placeholder="Subject" data-rule="minlen:4" data-msg="Please enter at least 8 chars of subject" />
                <div class="validation"></div>
              </div>
              <div class="form-group">
                <textarea class="form-control" name="message" rows="5" data-rule="required" data-msg="Please write something for us" placeholder="Message"></textarea>
                <div class="validation"></div>
              </div>
              <div class="text-center"><button type="submit">Send Message</button></div>
            </form>
          </div>
        </div> -->
        <div class="col-md-6">
          <h4>Chatbox (Leave a message here)</h4>
          <div class="row">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-12">
                <ul class="chat-box" id="chat-box">
                  <li v-for="message in myMessages" :key="message._id" style="margin-bottom: 5px;">
                    <vue-letter-avatar name='user' size='35' :rounded='true' />
                    <span class="chat-message">
                      <strong>User</strong> : {{ message.message }}
                    </span>
                    <p class="chat-date">{{ convertTimestampFromId(message._id) }}</p>
                  </li>
                </ul>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <div class="input-group">
                    <input type="text" class="form-control" placeholder="Type your message here" aria-label="Type your message here" v-model="message" @keypress.13.prevent="sendMessage">
                    <span class="input-group-btn">
                      <button class="btn btn-secondary" type="button" @click="sendMessage"><i class="fa fa-send"></i></button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
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
      myMessages: 'getMessages'
    })
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
        objDiv.scrollTop = objDiv.scrollHeight
      })
    }
  }
}
</script>

