<template>
    <header id="header" class="fixed-top">
      <nav class="navbar navbar-expand-sm">
        <div class="container">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#nav-content" aria-controls="nav-content" aria-expanded="false" aria-label="Toggle navigation">
        <i class="fa fa-bars" aria-hidden="true" style="color:white"></i>
        </button>
        <!-- Brand -->
         <router-link to="/"><a class="navbar-brand">Heroku Express</a></router-link>
        <!-- Links -->
          <div class="collapse navbar-collapse justify-content-end" id="nav-content">   
            <ul class="navbar-nav">
              <li class="nav-item">
              <router-link to="/"><a class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show">Home</a></router-link>
              </li>
            <li class="nav-item">
              <router-link to="/about-us"><a class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show">About Us</a></router-link>
              </li>
              <li class="nav-item">
              <router-link to="/features"><a class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show">Features</a></router-link>
              </li>
              <li class="nav-item">
              <router-link to="/portfolio"><a class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show">Portfolio</a></router-link>
              </li>
              <li class="nav-item">
              <router-link to="/team"><a class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show">Team</a></router-link>
              </li>
              <li class="nav-item">
              <router-link to="/contact-us"><a class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show">Contact Us</a></router-link>
              </li>
            </ul>
        </div>
        </div>
      </nav>
  </header>
</template>
<script>
export default {
  name: 'header',
  data () {
    return { message: 'awe'
    }
  },
  mounted () { }
}
</script>