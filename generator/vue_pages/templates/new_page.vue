<template>
  <section class="section">

    <h2><%= schema.label %> - New</h2>

    <hr>

    <<%= schema.class_name %>Form :model="model" />


    <button
      class="button is-light"
      @click="$router.go(-1)"
    >
      <i class="fa fa-fw fa-times"></i>
      Cancel
    </button>

    <!-- @click="createModel()" -->
    <button
      class="button is-primary"
    >
      <i class="fa fa-fw fa-plus"></i>
      Create <%= schema.label %>
    </button>

  </section>
</template>

<!-- // // // //  -->

<script>
// import { mapGetters, mapActions, mapMutations } from 'vuex'
import <%= schema.class_name %>Form from '@/modules/<%= schema.identifier %>/components/<%= schema.class_name %>Form'

export default {
  name: '<%= schema.class_name %>NewPage',
  metaInfo: {
    title: '<%= schema.label %> - New'
  },
  components: {
    <%= schema.class_name %>Form
  },
  data () {
    return {
      model: {}
    }
  }
  // created () {
  //   this.resetForm()
  // },
  // computed: mapGetters({
  //   model: '<%= schema.identifier %>/form/model'
  // }),
  // methods: {
  //   ...mapActions({
  //     createModel: '<%= schema.identifier %>/form/createModel'
  //   }),
  //   ...mapMutations({
  //     resetForm: '<%= schema.identifier %>/form/reset'
  //   })
  // }
}
</script>
