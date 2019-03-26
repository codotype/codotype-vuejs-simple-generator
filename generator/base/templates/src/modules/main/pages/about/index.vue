<template>
  <b-row class="h-100 align-items-center">
    <b-col lg="12">

      <div class="row my-2">
        <b-col lg="12" class="text-center">
          <p class="welcome-text">Built with</p>
        </b-col>
      </div>

      <div class="row my-4">
        <b-col lg="12" class="text-center">
          <img src="@/assets/logo.png">
        </b-col>
      </div>

      <b-row class="row my-4">
        <b-col lg="12" class="text-center">
          <a class="btn btn-lg btn-outline-dark" href="https://codotype.github.io" target="_blank">
            <i class="fa fa-book"></i>
            Documentation
          </a>
        </b-col>
      </b-row>

    </b-col>
  </b-row>
</template>

<script>
  export default {
    name: 'About',
    metaInfo: {
      title: 'About'
    }
  }
</script>
