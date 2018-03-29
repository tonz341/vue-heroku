<style lang="scss">
  @import '../node_modules/bootstrap/scss/bootstrap.scss';
</style>
<template>
  <div id="app">
    <header-section></header-section>
    <br>
    <br>
    <router-view/>
    <footer-section></footer-section>
    <Feedback></Feedback>
  </div>
</template>

<script>
import HeaderSection from './Header'
import FooterSection from './Footer'
import Feedback from './Feedback'
export default {
  components: { HeaderSection, FooterSection, Feedback },
  name: 'app'
}
</script>

