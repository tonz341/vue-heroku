<template>
<section>
  <div class="container">
    <div class="row">
      <div class="col-md-12 col-xs-12">
        <my-map></my-map>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import MyMap from './_partials/Map'
export default {
  name: 'contact',
  components : { MyMap },
  data () { 
    return {
      
    }
  },
  computed: {
    
  },
}
</script>

