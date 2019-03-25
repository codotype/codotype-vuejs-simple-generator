<template>
  <table class="table">
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
        <td v-if="model.<%= r.alias.identifier %>_id">{{model.<%= r.alias.identifier %>.<%= r.related_lead_attribute %>}}</td>
        <td v-else>N/A</td>
        <%_ } else if ([RELATION_TYPE_HAS_MANY].includes(r.type)) { _%>
        <td v-if="model.<%= r.alias.identifier %>_ids.length">{{model.<%= r.alias.identifier %>_ids.length }} <%= r.alias.label_plural %></td>
        <td v-else>N/A</td>
        <%_ } _%>
        <%_ }) _%>
      </tr>
    </tbody>
  </table>
</template>

<script>
// import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  // mounted () {
  //   this.fetch(this.id)
  // },
  // methods: mapActions({
  //   fetch: '<%= schema.identifier %>/related<%= rel.alias.class_name %>/fetch'
  // }),
  computed: {
    model () {
      return this.$store.getters['<%= rel.schema.identifier %>/collection/items'].find(s => s.id %> === this.id)
    }
  }
}
</script>
