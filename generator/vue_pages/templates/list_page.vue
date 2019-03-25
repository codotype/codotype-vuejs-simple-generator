<template>
  <section class="section">

    <div class="container is-fluid">

      <div class="columns">

        <div class="column is-9">
          <h1 class="title">
            <i class="fa fa-cube"></i>
            <%= schema.label_plural %>
          </h1>
        </div>

        <div class="column">
          <router-link
            class="button is-primary"
            to="/<%= schema.identifier_plural %>/new"
          >
            <i class="fa fa-fw fa-plus"></i>
            New <%= schema.label %>
          </router-link>
        </div>

      </div>



      <!-- <b-pagination :total-rows="count" :value="currentPage" :per-page="perPage" @change="goToPage" /> -->
      <!-- <LoadingFull v-if="fetching" /> -->
      <b-loading :active.sync="loading" :can-cancel="false"></b-loading>
      <ListView :collection="items" />
      <!-- <pre>{{items}}</pre> -->
    </div>

  </section>
</template>

<!-- // // // //  -->

<script>
import axios from 'axios'
import ListView from '@/modules/<%= schema.identifier %>/components/<%= schema.class_name %>List'
// import LoadingFull from '@/components/LoadingFull'

export default {
  name: '<%= schema.class_name %>List',
  components: {
  //   LoadingFull,
    ListView
  },
  metaInfo: {
    title: '<%= schema.label_plural %>'
  },
  created () {
    return this.fetch()
  },
  data () {
    return {
      items: [],
      loading: false
    }
  },
  methods: {
    async fetch () {
      this.loading = true
      const { data } = await axios.get('/api/<%= schema.identifier_plural %>')
      this.items = data.items
      this.loading = false
    }
  }
}
</script>
