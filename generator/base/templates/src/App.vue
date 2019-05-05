<template>
  <div id="app">
    <Navbar/>
    <section class="main-content">
      <router-view />
    </section>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'app',
  components: {
    Navbar
  },
  metaInfo: {
    title: 'Loading...', // set a title
    titleTemplate: '<%= blueprint.label %> - %s', // title is now "<%= blueprint.label %> - Loading..."
    htmlAttrs: {
      lang: 'en'
    }
  }
}
</script>

<style scoped>
.main-content {
  min-height: 400px;
}
</style>
