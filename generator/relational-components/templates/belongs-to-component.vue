<template>
  <table class="table is-fullwidth is-bordered is-striped">
    <thead>
      <%_ related_schema.attributes.forEach((attr) => { _%>
      <th><%= attr.label %></th>
      <%_ }) _%>
      <%_ related_schema.relations.forEach((r) => { _%>
      <%_ if ([RELATION_TYPE_BELONGS_TO, RELATION_TYPE_HAS_ONE].includes(r.type)) { _%>
      <th><%= r.alias.label %></th>
      <%_ } else if ([RELATION_TYPE_BELONGS_TO, RELATION_TYPE_HAS_ONE].includes(r.type)) { _%>
      <th><%= r.alias.label_plural %></th>
      <%_ } _%>
      <%_ }) _%>

    </thead>
    <tbody>
      <tr>
        <%_ related_schema.attributes.forEach((attr) => { _%>
        <%_ if (attr.datatype === 'STRING_ARRAY') { _%>
        <td>{{model.<%= attr.identifier %>.join(', ')}}</td>
        <%_ } else if (attr.datatype === 'BOOLEAN') { _%>
        <td>
          <span>
            <i class="fas fa-fw fa-check-square-o" v-if="model.<%= attr.identifier%>"></i>
            <i class="fas fa-fw fa-square-o" v-if="!model.<%= attr.identifier%>"></i>
          </span>
        </td>
        <%_ } else { _%>
        <td>{{model.<%= attr.identifier %>}}</td>
        <%_ } _%>
        <%_ }) _%>
        <%_ related_schema.relations.forEach((r) => { _%>
        <%_ if ([RELATION_TYPE_BELONGS_TO, RELATION_TYPE_HAS_ONE].includes(r.type)) { _%>
        <td v-if="model.<%= r.alias.identifier %>_id">{{ <%= r.alias.identifier %>.<%= r.related_lead_attribute %> }}</td>
        <td v-else>N/A</td>
        <%_ } else if ([RELATION_TYPE_HAS_MANY].includes(r.type)) { _%>
        <td v-if="model.<%= r.alias.identifier %>_ids.length">{{ model.<%= r.alias.identifier %>_ids.length }} <%= r.alias.label_plural %></td>
        <td v-else>N/A</td>
        <%_ } _%>
        <%_ }) _%>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    model () {
      return this.$store.getters['<%= relation.schema.identifier %>/collection/items'].find(s => s.id %> === this.id)
    },
    <%_ related_schema.relations.forEach((rel, index) => { _%>
    <%_ if ([RELATION_TYPE_HAS_ONE, RELATION_TYPE_BELONGS_TO].includes(rel.type)) { _%>
    <%= rel.alias.identifier %> () {
      return this.$store.getters['<%= rel.schema.identifier %>/collection/items'].find(m => m.id === this.model.<%= rel.alias.identifier + '_id' %>)
    }<%= helpers.trailingComma(related_schema.relations, index) %>
    <%_ } else { _%>
    <%= rel.alias.identifier_plural %> () {
      return this.$store.getters['<%= rel.schema.identifier %>/collection/items'].filter(m => m.id === this.model.<%= rel.alias.identifier + '_id' %>)
    }<%= helpers.trailingComma(related_schema.relations, index) %>
    <%_ } _%>
    <%_ }) _%>
  }
}
</script>
