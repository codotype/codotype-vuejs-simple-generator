
<template>
  <table class="table table-hover">

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

      <tr v-for="m in collection" :key="m.id">
      <%_ related_schema.attributes.forEach((attr) => { _%>
        <%_ if (attr.unique) { _%>
        <td>
          <router-link :to=" '/<%= related_schema.identifier_plural %>/' + m.id ">
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
        <td>{{ m.<%= attr.identifier %>.join(', ') }}</td>
        <%_ } else { _%>
        <td>{{m.<%= attr.identifier %>}}</td>
        <%_ } _%>
      <%_ }) _%>


      <%_ related_schema.relations.forEach((r) => { _%>
      <%_ if ([RELATION_TYPE_BELONGS_TO, RELATION_TYPE_HAS_ONE].includes(r.type)) { _%>

        <td v-if="m.<%= r.alias.identifier %>_id">
          <router-link :to="'/<%= r.schema.identifier_plural %>/' + m.<%= r.alias.identifier + '_id' %>">
            {{m.<%= r.alias.identifier %>.<%= r.related_lead_attribute %>}}
          </router-link>
        </td>
        <td v-else>N/A</td>
      <%_ } else if (r.type === RELATION_TYPE_HAS_MANY) { _%>

        <td v-if="m.<%=r.alias.identifier %>_ids">
          {{ m.<%=r.alias.identifier %>_ids.length }} <%=r.alias.label_plural %>
        </td>
        <td v-else>N/A</td>
      <%_ } _%>
      <%_ }) _%>



        <!-- Edit <%= related_schema.label %>-->
        <td class='text-right'>

          <b-dropdown right size="sm">
            <b-dropdown-item :to=" '/<%= related_schema.identifier_plural %>/' + m.id">
              <i class="fa fa-fw fa-eye"></i>
              View
            </b-dropdown-item>

            <b-dropdown-item v-if="isAuthenticated" :to=" '/<%= related_schema.identifier_plural %>/' + m.id + '/edit' ">
              <i class="far fa-fw fa-edit"></i>
              Edit
            </b-dropdown-item>

            <b-dropdown-item v-if="isAdmin" v-b-modal="'modal_' + m.id">
              <i class="far fa-fw fa-trash-alt"></i>
              Delete
            </b-dropdown-item>

          </b-dropdown>
        </td>

        <!-- Bootstrap Modal Component -->
        <b-modal :id="'modal_' + m.id"
          :title="'Destroy <%= related_schema.label %>?'"
          @ok="onConfirmDestroy(m.id)"
          ok-variant='danger'
          ok-title='DESTROY'
          cancel-title='Cancel'
        >
          <p class="text-left">Are you sure you want to destroy this <%= related_schema.label %>?</p>
        </b-modal>

      </tr>
    </tbody>

  </table>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  mounted () {
    this.fetch(this.id)
  },
  methods: mapActions({
    <%_ if ([RELATION_TYPE_BELONGS_TO, RELATION_TYPE_HAS_ONE].includes(rel.type)) { _%>
    fetch: '<%= schema.identifier %>/related<%= rel.alias.class_name %>/fetch',
    <%_ } else if (rel.type === RELATION_TYPE_HAS_MANY) { _%>
    fetch: '<%= schema.identifier %>/related<%= rel.alias.class_name_plural %>/fetch',
    <%_ } else if (rel.type === 'REF_BELONGS_TO') { _%>
    fetch: '<%= schema.identifier %>/related<%= rel.alias.class_name_plural %>/fetch',
    <%_ } _%>
    onConfirmDestroy: '<%= related_schema.identifier %>/destroy'
  }),
  computed: mapGetters({
    isAuthenticated: 'auth/is_authenticated',
    isAdmin: 'auth/isAdmin',
    <%_ if ([RELATION_TYPE_BELONGS_TO, RELATION_TYPE_HAS_ONE].includes(rel.type)) { _%>
    model: '<%= schema.identifier %>/related<%= rel.alias.class_name %>/model',
    <%_ } else if (rel.type === RELATION_TYPE_HAS_MANY) { _%>
    collection: '<%= schema.identifier %>/related<%= rel.alias.class_name_plural %>/collection',
    <%_ } else if (rel.type === 'REF_BELONGS_TO') { _%>
    collection: '<%= schema.identifier %>/related<%= rel.alias.class_name_plural %>/collection',
    <%_ } _%>
  })
}
</script>
