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

        <div class="column has-text-right">
          <router-link
            class="button is-primary"
            to="/<%= schema.identifier_plural %>/new"
          >
            <i class="fa fa-fw fa-plus"></i>
            New <%= schema.label %>
          </router-link>
        </div>
      </div>

      <ListView :collection="items" />

    </div>
  </section>
</template>

<!-- // // // //  -->

<script>
import { mapGetters } from 'vuex'
import ListView from '@/modules/<%= schema.identifier %>/components/<%= schema.class_name %>List'

export default {
  name: '<%= schema.class_name %>List',
  components: {
    ListView
  },
  metaInfo: {
    title: '<%= schema.label_plural %>'
  },
  computed: mapGetters({
    items: '<%= schema.identifier %>/collection/items'
  })
}
</script>
