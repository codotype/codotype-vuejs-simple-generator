<template>
  <section class="section">

    <h2><%= schema.label %> - Edit</h2>

    <hr>

    <<%= schema.class_name %>Form :model="model" />

    <button class="button is-primary" @click="updateModel()">
      <i class="fa fa-fw fa-plus"></i>
      Update <%= schema.label %>
    </button>

    <button class="button is-light" @click="$router.go(-1)">
      <i class="fa fa-fw fa-times"></i>
      Cancel
    </button>

  </section>
</template>

<!-- // // // //  -->

<script>
import <%= schema.class_name %>Form from '@/modules/<%= schema.identifier %>/components/<%= schema.class_name %>Form'

export default {
  name: '<%= schema.class_name %>NewPage',
  metaInfo: {
    title: '<%= schema.label %> - Edit'
  },
  components: {
    <%= schema.class_name %>Form
  },
  created () {
    this.resetForm()
  },
  data () {
    const model = this.$store.getters['<%= schema.identifier %>/collection/newModel']
    return { model }
  },
  methods: {
    updateModel () {
      this.$store.commit('<%= schema.identifier %>/collection/newModel', this.model)
      this.$store.dispatch('<%= schema.identifier %>/collection/create')
      this.$router.go(-1)
    },
    resetForm () {
      this.$store.commit('<%= schema.identifier %>/collection/resetNewModel')
    }
  }
}
</script>
