<template>
  <!-- <LoadingFull v-if="fetching" /> -->
  <section class="section">

    <!-- <<%= schema.class_name %>Detail :model="model" :fetching="fetching" /> -->

    <%_ if (schema.relations.length) { _%>

    <%_ schema.relations.forEach((rel) => { _%>
    <%_ if ([RELATION_TYPE_BELONGS_TO, RELATION_TYPE_HAS_ONE].includes(rel.type)) { _%>
    <p>Related<%= rel.alias.class_name %>Detail</p>
    <%_ } else if (['REF_BELONGS_TO', RELATION_TYPE_HAS_MANY].includes(rel.type)) { _%>
    <p>Related<%= rel.alias.class_name_plural %>List</p>
    <%_ } _%>
    <%_ }) _%>

    <%_ } _%>

  </section>
</template>

<!-- // // // //  -->

<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
import LoadingFull from '@/components/LoadingFull'
import <%= schema.class_name %>Detail from '@/modules/<%= schema.identifier %>/components/<%= schema.class_name %>Detail'
<%_ schema.relations.forEach((rel) => { _%>
<%_ if ([RELATION_TYPE_BELONGS_TO, RELATION_TYPE_HAS_ONE].includes(rel.type)) { _%>
import Related<%= rel.alias.class_name %>Detail from '@/modules/<%= schema.identifier %>/components/Related<%= rel.alias.class_name %>Detail'
<%_ } else if ([RELATION_TYPE_HAS_MANY, 'REF_BELONGS_TO'].includes(rel.type)) { _%>
import Related<%= rel.alias.class_name_plural %>List from '@/modules/<%= schema.identifier %>/components/Related<%= rel.alias.class_name_plural %>List'
<%_ } _%>
<%_ }) _%>

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  name: '<%= schema.identifier %>_show',
  metaInfo: {
    title: '<%= schema.label %>s - Show'
  },
  components: {
    <%_ schema.relations.forEach((rel) => { _%>
    <%_ if ([RELATION_TYPE_BELONGS_TO, RELATION_TYPE_HAS_ONE].includes(rel.type)) { _%>
    Related<%= rel.alias.class_name %>Detail,
    <%_ } else if (['REF_BELONGS_TO', RELATION_TYPE_HAS_MANY].includes(rel.type)) { _%>
    Related<%= rel.alias.class_name_plural %>List,
    <%_ } _%>
    <%_ }) _%>
    <%= schema.class_name %>Detail,
    LoadingFull
  },
  created () {
    this.fetch(this.id)
  },
  methods: mapActions({
    fetch: '<%= schema.identifier %>/show/fetch',
    onConfirmDestroy: '<%= schema.identifier %>/destroy'
  }),
  computed: mapGetters({
    currentUser: 'auth/current_user',
    isAdmin: 'auth/isAdmin',
    model: '<%= schema.identifier %>/show/model',
    fetching: '<%= schema.identifier %>/show/loading'
  })
}
</script>
