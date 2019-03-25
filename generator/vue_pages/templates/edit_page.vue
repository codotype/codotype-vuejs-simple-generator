<template>
  <LoadingFull v-if="fetching" />
  <section class="section" v-else>

    <h2><%= schema.label %> - Edit</h2>

    <hr>

    <!-- <<%= schema.class_name %>Form :model="model" /> -->

    <button
      class="mr-2"
      @click="$router.go(-1)"
    >
      <i class="fa fa-fw fa-times"></i>
      Cancel
    </button>

    <button
      @click="updateModel(model)"
    >
      <i class="fa fa-fw fa-plus"></i>
      Update <%= schema.label %>
    </button>

  </section>
</template>

<!-- // // // //  -->

<script>
import axios from 'axios'
// import LoadingFull from '@/components/LoadingFull'
// import <%= schema.class_name %>Form from '@/modules/<%= schema.identifier %>/components/<%= schema.class_name %>Form'

export default {
  name: '<%= schema.class_name %>EditPage',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  metaInfo: {
    title: '<%= schema.label %> - Edit'
  },
  // components: {
  //   LoadingFull,
  //   <%= schema.class_name %>Form
  // },
  created () {
    this.fetch(this.id)
  },
  data () {
    return {
      model: [],
      loading: false
    }
  },
  methods: {
    async fetch () {
      this.loading = true
      this.model = {}
      const { data } = await axios.get(`/api/<%= schema.identifier_plural %>/${this.id}`)
      this.model = data
      this.loading = false
    },
    async updateModel () {
      this.loading = true
      this.model = {}
      const { data } = await axios.put(`/api/<%= schema.identifier_plural %>/${this.id}`, { ...this.model })
      this.model = data
      this.loading = false
    }
  }
}
</script>
