<template>
  <table class="table is-fullwidth is-bordered is-striped is-narrow is-hoverable">

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

      <tr v-for="m in collection" :key="m._id">
      <%_ schema.attributes.forEach((attr, index) => { _%>
        <%_ if (attr.unique) { _%>
        <td>
          <router-link :to=" '/<%= schema.identifier_plural %>/' + m._id ">
            {{ m.<%=attr.identifier%> }}
          </router-link>
        </td>
        <%_ } else if (attr.datatype === 'BOOLEAN') { _%>
        <td>
          <span>
            <i class="fas fa-fw fa-check-square" v-if="m.<%=attr.identifier%>"></i>
            <i class="fa fa-fw fa-square-o" v-if="!m.<%=attr.identifier%>"></i>
          </span>
        </td>
        <%_ } else if (attr.datatype === 'STRING_ARRAY') { _%>
        <td>{{m.<%= schema.attributes[index].identifier %>.join(', ')}}</td>
        <%_ } else { _%>
        <td>{{m.<%= schema.attributes[index].identifier %>}}</td>
        <%_ } _%>
      <%_ }) _%>
      <%_ schema.relations.forEach((rel) => { _%>
      <%_ if ([RELATION_TYPE_BELONGS_TO, RELATION_TYPE_HAS_ONE].includes(rel.type)) { _%>
        <td v-if="m.<%= rel.alias.identifier %>_id">
          <router-link :to="'/<%= rel.schema.identifier_plural %>/' + m.<%= rel.alias.identifier + '_id' %>">
            {{m.<%= rel.alias.identifier %>.<%= rel.related_lead_attribute %>}}
          </router-link>
        </td>
        <td v-else></td>
      <%_ } else if (rel.type === RELATION_TYPE_HAS_MANY) { _%>
        <td v-if="m.<%=rel.alias.identifier %>_ids">
          {{ m.<%=rel.alias.identifier %>_ids.length }} <%=rel.alias.label_plural %>
        </td>
        <td v-else>
          None
        </td>
      <%_ } _%>
      <%_ }) _%>
        <!-- Edit <%= schema.label %>-->
        <td class='text-right'>

            <router-link :to=" '/<%= schema.identifier_plural %>/' + m._id">
              <i class="fa fa-fw fa-eye"></i>
              View
            </router-link>

            <router-link :to=" '/<%= schema.identifier_plural %>/' + m._id + '/edit' ">
              <i class="far fa-fw fa-edit"></i>
              Edit
            </router-link>

            <router-link>
              <i class="far fa-fw fa-trash-alt"></i>
              Delete
            </router-link>
        </td>
      </tr>
    </tbody>

  </table>
</template>

<!-- // // // //  -->

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: ['collection'],
  methods: mapActions({
    onConfirmDestroy: '<%= schema.identifier %>/destroy'
  }),
  computed: mapGetters({
    currentUser: 'auth/current_user',
    isAuthenticated: 'auth/is_authenticated',
    isAdmin: 'auth/isAdmin'
  })
}
</script>
