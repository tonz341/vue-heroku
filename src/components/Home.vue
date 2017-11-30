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
            <a class="hero-brand" href="index.html" title="Home"><img alt="Bell Logo" src="/static/img/logo.png"></a>
          </div>
        </div>
        <div class="col-md-12">
          <h1>
              A theme with personality
            </h1>

          <p class="tagline">
            This is a powerful theme with some great features that you can use in your future projects.
          </p>
          <a class="btn btn-full" href="#about">Get Started Now</a>
        </div>
      </div>
    </section>
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

