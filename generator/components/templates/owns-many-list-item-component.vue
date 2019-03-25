<template>
  <tr>
  <%_ related_schema.attributes.forEach((attr, index) => { _%>
    <%_ if (attr.unique) { _%>
    <td>
      <router-link :to=" '/<%= related_schema.identifier_plural %>/' + model.id ">
        {{ model.<%=attr.identifier%> }}
      </router-link>
    </td>
    <%_ } else if (attr.datatype === 'BOOLEAN') { _%>
    <td>
      <span>
        <i class="fas fa-fw fa-check-square" v-if="model.<%=attr.identifier%>"></i>
        <i class="fa fa-fw fa-square-o" v-if="!model.<%=attr.identifier%>"></i>
      </span>
    </td>
    <%_ } else if (attr.datatype === 'STRING_ARRAY') { _%>
    <td>{{model.<%= related_schema.attributes[index].identifier %>.join(', ')}}</td>
    <%_ } else { _%>
    <td>{{model.<%= related_schema.attributes[index].identifier %>}}</td>
    <%_ } _%>
  <%_ }) _%>
  <%_ related_schema.relations.forEach((rel) => { _%>
  <%_ if (relation.id === rel.id) { return } _%>
  <%_ if ([RELATION_TYPE_BELONGS_TO, RELATION_TYPE_HAS_ONE].includes(rel.type)) { _%>
    <td v-if="model.<%= rel.alias.identifier %>_id">
      <router-link :to="'/<%= rel.schema.identifier_plural %>/' + model.<%= rel.alias.identifier + '_id' %>">
        {{ <%= rel.alias.identifier %>.<%= rel.related_lead_attribute %> }}
      </router-link>
    </td>
    <td v-else></td>
  <%_ } else if (rel.type === RELATION_TYPE_HAS_MANY) { _%>
    <td v-if="model.<%= rel.alias.identifier %>_ids">
      {{ model.<%= rel.alias.identifier %>_ids.length }} <%=rel.alias.label_plural %>
    </td>
    <td v-else>
      None
    </td>
  <%_ } _%>
  <%_ }) _%>
    <!-- Edit <%= related_schema.label %>-->
    <td class='text-right'>

        <router-link
          :to="`/<%= related_schema.identifier_plural %>/${model.id}`"
          class="button is-small is-primary"
        >
          <i class="fa fa-fw fa-eye"></i>
          View
        </router-link>

        <router-link
          :to="`/<%= related_schema.identifier_plural %>/${model.id}/edit`"
          class="button is-small is-warning"
        >
          <i class="far fa-fw fa-edit"></i>
          Edit
        </router-link>

        <a class="button is-small is-danger">
          <i class="far fa-fw fa-trash-alt"></i>
          Delete
        </a>
    </td>
  </tr>
</template>

<!-- // // // //  -->

<script>
export default {
  props: {
    model: {
      required: true
    }
  },
  computed: {
    <%_ related_schema.relations.forEach((rel, index) => { _%>
    <%= rel.alias.identifier %> () {
      return this.$store.getters['<%= rel.schema.identifier %>/collection/items'].find(m => m.id === this.model.<%= rel.alias.identifier + '_id' %>)
    }<%= helpers.trailingComma(related_schema.relations, index) %>
    <%_ }) _%>
  }
}
</script>
