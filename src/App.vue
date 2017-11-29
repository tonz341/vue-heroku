<template>
  <div id="app">
    <navigation-bar></navigation-bar>
    <div style="margin-top:50px">
      <router-view/>
    </div>
  </div>
</template>

<script>
import NavigationBar from './Navigation'
export default {
  components: { NavigationBar },
  name: 'app'
}
</script>

