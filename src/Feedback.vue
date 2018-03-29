<style>
.feedback-button {
  height: 40px;
  border: solid 1px #CCCCCC;
  border-radius: 5px;
  background: #2a674e;
  width: 120px;
  line-height: 32px;
  -webkit-transform: rotate(-90deg);
  font-weight: 700;
  color: white;
  transform: rotate(-90deg);
  -ms-transform: rotate(-90deg);
  -moz-transform: rotate(-90deg);
  text-align: center;
  font-size: 21px;
  position: fixed;
  right: -40px;
  top: 76%;
  font-family: "Roboto", helvetica, arial, sans-serif;
  z-index: 999;
  }

  .feedback-box {
    height: 400px;
    border: solid 1px #596d5c;
    border-radius: 5px;
    background: whitesmoke;
    width: 350px;
    line-height: 32px;
    /* -webkit-transform: rotate(-90deg); */
    /* font-weight: 700; */
    /* color: white; */
    /* transform: rotate(-90deg); */
    -ms-transform: rotate(-90deg);
    -moz-transform: rotate(-90deg);
    /* text-align: justify; */
    position: fixed;
    right: 40px;
    top: 48%;
    font-family: "Roboto", helvetica, arial, sans-serif;
    z-index: 999;
    padding: 5px;
    font-size: 14px;
  }

</style>

<template>
<div>
 <button class="feedback-button" @click="showChat=!showChat">Message</button>

  <div class="feedback-box" v-show="showChat">
    <div class="col-xs-12">
    <chat></chat>
    </div>
  </div>
</div>
</template>

<script>
import Chat from './components/_partials/Chat'
export default {
  name: 'feedback',
  components : { Chat },
  data () {
    return {
      showChat: false
    }
  }
}
</script>