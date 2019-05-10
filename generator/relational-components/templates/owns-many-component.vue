
<template>
  <table class="table is-fullwidth is-bordered is-striped">

    <!-- Table Header -->
    <thead>
      <%_ related_schema.attributes.forEach((attr) => { _%>
      <%_ if (attr.help) { _%>
      <th>
        <%= attr.label %>
        <i class="fa fa-fw fa-question-circle-o" v-b-tooltip.hover.bottom title="<%= attr.help %>" ></i>
      </th>
      <%_ } else { _%>
      <th><%= attr.label %></th>
      <%_ } _%>
      <%_ }) _%>
      <%_ related_schema.relations.forEach((r) => { _%>
      <%_ if (relation.id === r.id) { return } _%>
      <%_ if ([RELATION_TYPE_BELONGS_TO, RELATION_TYPE_HAS_ONE].includes(r.type)) {_%>
      <th><%= r.alias.label %></th>
      <%_ } _%>
      <%_ }) _%>
      <th></th>
    </thead>

    <!-- Table Body -->
    <tbody>

      <!-- Empty Table Row -->
      <tr class='table-warning' v-if="!collection[0]">
        <%_ related_schema.attributes.forEach((attr, index) => { _%>
        <%_ if (index === 0) { _%>
        <td>No <%= related_schema.label_plural %> Available</td>
        <%_ } else { _%>
        <td></td>
        <%_ } _%>
        <%_ }) _%>
        <%_ related_schema.relations.forEach((r) => { _%>
        <%_ if ([RELATION_TYPE_BELONGS_TO, RELATION_TYPE_HAS_ONE].includes(r.type)) { _%>
        <td></td>
        <%_ } _%>
        <%_ }) _%>
        <td></td>
      </tr>

      <Related<%= relation.alias.class_name %>ListItem v-for="m in collection" :model="m" :key="m.id" />

    </tbody>

  </table>
</template>

<script>
// TODO - this component must be split up for relations and reverse relations
// TODO - this component must be split up for relations and reverse relations
// TODO - this component must be split up for relations and reverse relations
// TODO - this component must be split up for relations and reverse relations
// TODO - this component must be split up for relations and reverse relations
// TODO - this component must be split up for relations and reverse relations
import Related<%= relation.alias.class_name %>ListItem from './Related<%= relation.alias.class_name %>ListItem'
export default {
  props: {
    <%= schema.identifier %>_id: {
      type: String,
      required: true
    }
  },
  components: {
    Related<%= relation.alias.class_name %>ListItem
  },
  computed: {
    <%_ if ([RELATION_TYPE_BELONGS_TO, RELATION_TYPE_HAS_ONE].includes(relation.type)) { _%>
    collection () {
      return this.$store.getters['<%= relation.schema.identifier %>/collection/items']
      .filter(s => s.<%= schema.identifier %>_id === this.<%= schema.identifier %>_id)
    },
    <%_ } _%>
    <%_ if ([RELATION_TYPE_HAS_MANY].includes(relation.type)) { _%>
    collection () {
      return this.$store.getters['<%= relation.schema.identifier %>/collection/items']
    },
    <%_ } else if (relation.type === 'REF_BELONGS_TO') { _%>
    collection () {
      return this.$store.getters['<%= schema.identifier %>/related<%= relation.alias.class_name_plural %>/collection']
    },
    <%_ } _%>
  }
}
</script>
