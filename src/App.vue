<template>
  <div id="app">
    <navigation-bar></navigation-bar>

    <router-view/>
  </div>
</template>

<script>
import NavigationBar from './Navigation'
export default {
  components: { NavigationBar },
  name: 'app'
}
</script>

