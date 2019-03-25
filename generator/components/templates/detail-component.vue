<template>
  <div class="card">
    <div class="card-content">

      <div class="columns">

        <div class="column is-9">
          <h1 class="title">
            <i class="fa fa-cube"></i>
            <%= schema.label %> Detail
          </h1>
        </div>

        <div class="column">
          <div class="buttons is-right">
            <router-link class='button is-warning' :to=" '/<%= schema.identifier_plural %>/' + model.id + '/edit' ">
              <i class="far fa-fw fa-edit"></i>
              Edit
            </router-link>

            <button class='button is-danger'>
              <i class="far fa-fw fa-trash-alt"></i>
              Delete
            </button>

          </div>
        </div>

      </div>

      <table class="table is-fullwidth is-bordered is-striped">

        <!-- Table Header -->
        <tbody>
        <%_ schema.attributes.forEach((attr) => { _%>
          <tr>
            <td><%= attr.label %></td>
            <%_ if (attr.datatype === 'STRING_ARRAY') { _%>
            <td>{{model.<%= attr.identifier %>.join(', ')}}</td>
            <%_ } else if (attr.datatype === 'BOOLEAN') { _%>
            <td>
              <span>
                <i class="fas fa-fw fa-check-square" v-if="model.<%= attr.identifier%>"></i>
                <i class="fa fa-fw fa-square-o" v-if="!model.<%= attr.identifier%>"></i>
              </span>
            </td>
            <%_ } else { _%>
            <td>{{model.<%= attr.identifier %>}}</td>
            <%_ } _%>
          </tr>
        <%_ }) _%>
        <%_ schema.relations.forEach((rel) => { _%>
        <%_ if ([RELATION_TYPE_BELONGS_TO, RELATION_TYPE_HAS_ONE].includes(rel.type)) { _%>
          <tr>
            <td><%= rel.alias.label %></td>
            <td v-if="model.<%= rel.alias.identifier %>_id">
              <router-link :to="'/<%= rel.schema.identifier_plural %>/' + model.<%= rel.alias.identifier + '_id' %>">
                {{<%= rel.alias.identifier %>.<%= rel.related_lead_attribute %>}}
              </router-link>
            </td>
            <td v-else>N/A</td>
          </tr>
        <%_ } else if ([RELATION_TYPE_HAS_MANY].includes(rel.type)) { _%>
          <tr>
            <td><%= rel.alias.label_plural %></td>
            <td>{{model.<%= rel.alias.identifier %>_ids.length }} <%= rel.alias.label_plural %></td>
          </tr>
        <%_ } _%>
        <%_ }) _%>
        </tbody>

      </table>

    </div>
  </div>
</template>

<!-- // // // //  -->

<script>

export default {
  name: '<%= schema.class_name %>Detail',
  props: {
    model: {
      required: true
    }
  },
  computed: {
    <%_ schema.relations.forEach((rel, index) => { _%>
    <%= rel.alias.identifier %> () {
      return this.$store.getters['<%= rel.schema.identifier %>/collection/items'].find(m => m.id === this.model.<%= rel.alias.identifier + '_id' %>)
    }<%= helpers.trailingComma(schema.relations, index) %>
    <%_ }) _%>
  }
}
</script>
