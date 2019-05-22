<template>
  <section class="section">
    <form class="container is-fluid" @submit="updateModel">

      <h2 class='title'><%= schema.label %> - Edit</h2>

      <hr>

      <<%= schema.class_name %>Form :model="model" />

      <hr>

      <div class="buttons is-right">
        <button class="button is-primary" type="submit">
          <i class="fa fa-fw fa-plus"></i>
          Update <%= schema.label %>
        </button>

        <button class="button is-light" @click="$router.go(-1)">
          <i class="fa fa-fw fa-times"></i>
          Cancel
        </button>
      </div>

    </form>
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
  props: {
    id: {
      required: true,
      type: String
    }
  },
  components: {
    <%= schema.class_name %>Form
  },
  created () {
    this.resetForm()
  },
  data () {
    const selected = this.$store.getters['<%= schema.identifier %>/collection/items'].find(m => m.id === this.id)
    const model = Object.assign({}, selected)
    return { model }
  },
  methods: {
    updateModel (e) {
      e.preventDefault()
      this.$store.commit('<%= schema.identifier %>/collection/editModel', this.model)
      this.$store.dispatch('<%= schema.identifier %>/collection/update')
      this.$router.go(-1)
    },
    resetForm () {
      this.$store.commit('<%= schema.identifier %>/collection/resetNewModel')
    }
  }
}
</script>
