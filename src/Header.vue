<template>
    <header id="header" class="fixed-top">
      <nav class="navbar navbar-expand-sm" style="background-color:black">
        <div class="container">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#nav-content" aria-controls="nav-content" aria-expanded="false" aria-label="Toggle navigation">
        <i class="fa fa-bars" aria-hidden="true" style="color:white"></i>
        </button>
        <!-- Brand -->
         <router-link to="/"><a class="navbar-brand">Winston Fale</a></router-link>
        <!-- Links -->
          <div class="collapse navbar-collapse justify-content-end" id="nav-content">   
            <ul class="navbar-nav">
              <li class="nav-item">
              <router-link to="/"><a class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show">Home</a></router-link>
              </li>
              <li class="nav-item">
              <router-link to="/about-us"><a class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show">About</a></router-link>
              </li>
              <!-- <li class="nav-item">
              <router-link to="/features"><a class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show">Features</a></router-link>
              </li> -->
              <!-- <li class="nav-item">
              <router-link to="/portfolio"><a class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show">Portfolio</a></router-link>
              </li> -->
                   <li class="nav-item">
              <router-link to="/notes"><a class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show">Notes</a></router-link>
              </li>
              <li class="nav-item">
              <router-link to="/team"><a class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show">Team</a></router-link>
              </li>
              <li class="nav-item">
              <router-link to="/contact-us"><a class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show">Contact</a></router-link>
              </li>
              <li class="nav-item">
              <a class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show"></a>
              </li>

              <!-- <li class="nav-item dropdown" @mouseleave="showLogin=false" v-if="!currentUser">
                <a class="nav-link" @click="showLogin=!showLogin" > 
                  Login
                </a>
                <div class="dropdown-menu" aria-labelledby="Preview" :class="{ 'display-div' : showLogin }" @mouseover="showLogin=true" @mouseleave="showLogin=false" >
                  <form action="/admin/login" @submit.prevent="login">
                    <a class="dropdown-item" href="#"><input type="text" name="email" placeholder="email" class="form-control"></a>
                    <a class="dropdown-item" href="#"><input type="password" name="password" placeholder="password" class="form-control"></a>
                    <a class="dropdown-item" href="#"><button type="submit" class="btn btn-success">Login</button></a>
                  </form>
                </div>
              </li> -->

              <li class="nav-item dropdown" >
                <a class="nav-link dropdown-toggle" href="/" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{ currentUser ? 'Hi ' + currentUser.firstname : 'Login' }}</a>
                <div class="dropdown-menu" aria-labelledby="dropdown01" style="min-width: 17rem;">
                  <div v-if="!currentUser">
                    <form action="/admin/login" @submit.prevent="login">
                      <a class="dropdown-item" href="#"><input tabindex="1" type="text" name="email" placeholder="Email address" class="form-control"></a>
                      <a class="dropdown-item" href="#"><input tabindex="2" type="password" name="password" placeholder="password" class="form-control"></a>
                      <a class="dropdown-item" href="#"><button tabindex="3" type="submit" class="btn btn-success">Login</button></a>
                    </form>
                  </div>
                  <div v-else>
                    <a class="dropdown-item" href="/admin/logout">Logout</a>
                  </div>
                </div>
              </li>

                <!-- <li class="nav-item dropdown">
                <a class="nav-link" @click="showLogin=!showLogin" > 
                  Login
                </a>
                <div class="dropdown-menu" aria-labelledby="Preview" :class="{ 'display-div' : showLogin }">
                  <div class="form-group">
                    <form action="/admin/login" @submit.prevent="login">
                        <label for="email">Email</label>
                        <input type="text" name="email" placeholder="email" class="form-control">
                        <label for="password">Password</label>
                        <input type="password" name="password" placeholder="password" class="form-control">
                        <button type="submit" class="btn btn-success">Login</button>
                    </form>
                  </div>
                </div>
              </li> -->

      
               <!-- <li class="nav-item dropdown" @mouseleave="showLogin=false" v-if="currentUser">
                <a class="nav-link dropdown-toggle" @click="showLogin=!showLogin" > 
                   {{ currentUser.firstname ? 'Hi ' + currentUser.firstname : 'Login' }}
                </a>
                <div class="dropdown-menu" aria-labelledby="Preview" :class="{ 'display-div' : showLogin }" @mouseover="showLogin=true" @mouseleave="showLogin=false" >
                   <a class="dropdown-item" href="/admin/logout">Logout</a>
                </div>
              </li> -->
            </ul>
        </div>
        </div>
      </nav>
  </header>
</template>
<style>
 
.display-div {
  display: inline;
}

.dropdown-item {
  color: black !important
}

</style>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'header',
  data () {
    return { showLogin: false
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'getUser'
    })
  },
  mounted () { 

  },
  methods : {
  login (e) {
        window.axios.post(window.$(e.target).attr('action'), window.$(e.target).serialize())
        .then((response) => {
          if (response.data.code === 200) {
            this.$store.commit('ASSIGN_USER', response.data.user)
            this.$router.push('/')
            // window.location.replace('/admin/dashboard')
          }
          else {
            alert('Invalid Credentials')
          }
        })
        .catch(error => {
          console.log(error.statusText)
        })
      }
  }
}
</script>