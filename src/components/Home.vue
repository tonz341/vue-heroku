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
  <div>
    <section class="hero">
      <div class="container text-center">
        <div class="row">
          <div class="col-md-12">
            <!-- <a class="hero-brand" href="index.html" title="Home"><img alt="Bell Logo" src="/static/img/logo-s.png"></a> -->
            <h1 style="color:antiquewhite">Welcome visitor! </h1>
          </div>
        </div>
        <div class="col-md-12">
          <p class="tagline" style="color:antiquewhite"><br>
           Every great developer you know got there by solving problems <br> they were unqualified to solve until they actually did it. <br />
           <br>
           by Patrick McKenzie
          </p>
          <br>
          <br>
        </div>
      </div>
    </section>
  </div>


</template>

<script>
import Test from './_test/Test'

export default {
  name: 'Home',
  components : { Test },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

