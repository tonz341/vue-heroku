<template>
<section>
  <div class="container">
    <div class="row">
      <div class="col-xs-4 offset-8">
        <chat></chat>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import Chat from './_partials/Chat'
export default {
  name: 'contact',
  components : { Chat },
  data () {
    return {
      
    }
  },
  computed: {
    
  },
}
</script>

