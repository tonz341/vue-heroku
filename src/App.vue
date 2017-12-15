<template>
  <div id="app">
    <header-section></header-section>
    <router-view/>
    <footer-section></footer-section>
  </div>
</template>

<script>
import HeaderSection from './Header'
import FooterSection from './Footer'
export default {
  components: { HeaderSection, FooterSection },
  name: 'app'
}
</script>

