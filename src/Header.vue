<template>
  <div>
    <header id="header" class="fixed-top">
    <div class="container">
      <div id="logo" class="pull-left">
        <router-link to="/"><img src="/static/img/tonz.png" alt="" title="" /></img></router-link>
        <!-- Uncomment below if you prefer to use a text image -->
        <!--<h1><a href="#hero">Bell</a></h1>-->
      </div>

      <nav id="nav-menu-container fixed-top">
        <ul class="nav-menu">
          <li><router-link to="/about-us">About Us</router-link></li>
          <li><router-link to="/features">Features</router-link></li>
          <li><router-link to="/portfolio">Portfolio</router-link></li>
          <li><router-link to="/team">Team</router-link></li>
          <li> <router-link to="/contact-us">Contact Us</router-link></li>
        </ul>
      </nav>
      <nav class="nav social-nav pull-right d-none d-lg-inline">
        <a href="#"><i class="fa fa-twitter"></i></a> <a href="#"><i class="fa fa-facebook"></i></a> <a href="#"><i class="fa fa-linkedin"></i></a> <a href="#"><i class="fa fa-envelope"></i></a>
      </nav>
    </div>
  </header>
  </div>
</template>

<script>
export default {
  name: 'header',
  data () {
    return {message: 'awe'
    }
  }
}
</script>