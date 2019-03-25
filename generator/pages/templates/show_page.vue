<template>
  <section class="section">

    <<%= schema.class_name %>Detail :model="model" />

    <%_ if (schema.relations.length) { _%>

    <%_ schema.relations.forEach((rel) => { _%>
    <%_ if ([RELATION_TYPE_BELONGS_TO, RELATION_TYPE_HAS_ONE].includes(rel.type)) { _%>
    <Related<%= rel.alias.class_name %>Detail :id="model.<%= rel.alias.identifier %>_id"/>
    <%_ } else if ([RELATION_TYPE_HAS_MANY].includes(rel.type)) { _%>
    <!-- <Related<%= rel.alias.class_name_plural %>List/> -->
    <%_ } _%>
    <%_ }) _%>

    <%_ schema.reverse_relations.forEach((rel) => { _%>

    <%_ if ([RELATION_TYPE_BELONGS_TO].includes(rel.type)) { _%>
    <!-- <Related<%= rel.alias.class_name_plural %>List :<%= schema.identifier %>_id="model.id" /> -->
    <%_ } _%>
    <%_ }) _%>

    <%_ } _%>

  </section>
</template>

<!-- // // // //  -->

<script>
// TODO - implement reverse relations
// TODO - implement reverse relations
// TODO - implement reverse relations
import <%= schema.class_name %>Detail from '@/modules/<%= schema.identifier %>/components/<%= schema.class_name %>Detail'
<%_ schema.relations.forEach((rel) => { _%>
<%_ if ([RELATION_TYPE_BELONGS_TO, RELATION_TYPE_HAS_ONE].includes(rel.type)) { _%>
import Related<%= rel.alias.class_name %>Detail from '@/modules/<%= schema.identifier %>/components/Related<%= rel.alias.class_name %>Detail'
<%_ } else if ([RELATION_TYPE_HAS_MANY].includes(rel.type)) { _%>
// import Related<%= rel.alias.class_name_plural %>List from '@/modules/<%= schema.identifier %>/components/Related<%= rel.alias.class_name_plural %>List'
<%_ } _%>
<%_ }) _%>

// TODO - implement reverse relations
// TODO - implement reverse relations
<%_ schema.reverse_relations.forEach((rel) => { _%>
<%_ if ([RELATION_TYPE_BELONGS_TO].includes(rel.type)) { _%>
// import Related<%= rel.alias.class_name_plural %>List from '@/modules/<%= schema.identifier %>/components/Related<%= rel.alias.class_name_plural %>List'
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
    <%_ } else if ([RELATION_TYPE_HAS_MANY].includes(rel.type)) { _%>
    // Related<%= rel.alias.class_name_plural %>List,
    <%_ } _%>
    <%_ }) _%>
    <%_ schema.reverse_relations.forEach((rel) => { _%>
    <%_ if ([RELATION_TYPE_BELONGS_TO].includes(rel.type)) { _%>
    // Related<%= rel.alias.class_name_plural %>List,
    <%_ } _%>
    <%_ }) _%>
    <%= schema.class_name %>Detail
  },
  computed: {
    model () {
      return this.$store.getters['<%= schema.identifier %>/collection/items'].find(<%= schema.identifier %> => <%= schema.identifier %>.id === this.id)
    }
  }
}
</script>
