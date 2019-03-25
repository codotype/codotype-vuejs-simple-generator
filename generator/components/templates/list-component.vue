<template>
  <table class="table is-fullwidth is-bordered is-striped">

    <!-- Table Header -->
    <thead>
      <%_ schema.attributes.forEach((attr) => { _%>
      <%_ if (attr.help) { _%>
      <th>
        <b-tooltip
          label="<%= attr.help %>"
          position="is-right"
        >
          <%= attr.label %>
          <i class="fa fa-fw fa-question-circle-o"></i>
        </b-tooltip>
      </th>
      <%_ } else { _%>
      <th><%= attr.label %></th>
      <%_ } _%>
      <%_ }) _%>
      <%_ schema.relations.forEach((rel) => { _%>
      <%_ if ([RELATION_TYPE_BELONGS_TO, RELATION_TYPE_HAS_ONE].includes(rel.type)) { _%>
      <th><%= rel.alias.label %></th>
      <%_ } else if (rel.type === RELATION_TYPE_HAS_MANY) { _%>
      <th><%= rel.alias.label_plural %></th>
      <%_ } _%>
      <%_ }) _%>
      <th></th>
    </thead>

    <!-- Table Body -->
    <tbody>

      <!-- Empty Table Row -->
      <tr class='table-warning' v-if="!collection[0]">
        <%_ schema.attributes.forEach((attr, indx) => { _%>
        <%_ if (indx === 0) { _%>
        <td>No <%= schema.label_plural %> Available</td>
        <%_ } else { _%>
        <td></td>
        <%_ } _%>
        <%_ }) _%>
        <%_ schema.relations.forEach((rel) => { _%>
        <%_ if ([RELATION_TYPE_BELONGS_TO, RELATION_TYPE_HAS_MANY, RELATION_TYPE_HAS_ONE].includes(rel.type)) { _%>
        <td></td>
        <%_ } _%>
        <%_ }) _%>
        <td></td>
      </tr>

      <<%= schema.class_name %>ListItem v-for="m in collection" :key="m.id" :model="m" />
    </tbody>

  </table>
</template>

<!-- // // // //  -->

<script>
import <%= schema.class_name %>ListItem from './<%= schema.class_name %>ListItem'

export default {
  props: {
    collection: {
      required: true
    }
  },
  components: {
    <%= schema.class_name %>ListItem
  }
}
</script>
