<style scoped>
#hello {
  background-image: linear-gradient(rgba(55, 63, 70, 0.8), rgba(55, 63, 70, 0), rgba(55, 63, 70, 0)), url(https://mdbootstrap.com/img/Photos/Others/city7.jpg);
  background-repeat: no-repeat;
  background-position: right bottom;
  background-size: auto 100%;
  padding-bottom: 3rem;
  height: 650px;
}
.center-float{
  position: absolute;
  z-index: 1;
  text-align: center;
  width: 100%;
  margin-top: 35%
}
</style>

<template>
  <div class="home-template">
    <div id="hello">
        <div class="center-float">
          <button type="button" class="btn btn-primary">Button 1 </button>
          <!-- Default button -->
          <button type="button" class="btn btn-default">Button 2</button>
        </div>
    </div>
    <div class="container">
     <div class="row">
       <div class="col-lg">
         
       </div>
     </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

