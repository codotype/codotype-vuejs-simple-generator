<template>
  <tr>
  <%_ schema.attributes.forEach((attr, index) => { _%>
    <%_ if (attr.unique) { _%>
    <td>
      <router-link :to=" '/<%= schema.identifier_plural %>/' + model.id ">
        {{ model.<%=attr.identifier%> }}
      </router-link>
    </td>
    <%_ } else if (attr.datatype === DATATYPE_BOOLEAN) { _%>
    <td>
      <span>
        <i class="fas fa-fw fa-check-square" v-if="model.<%=attr.identifier%>"></i>
        <i class="fa fa-fw fa-square-o" v-if="!model.<%=attr.identifier%>"></i>
      </span>
    </td>
    <%_ } else if (attr.datatype === DATATYPE_STRING_ARRAY) { _%>
    <td>{{model.<%= schema.attributes[index].identifier %>.join(', ')}}</td>
    <%_ } else { _%>
    <td>{{model.<%= schema.attributes[index].identifier %>}}</td>
    <%_ } _%>
  <%_ }) _%>
  <%_ schema.relations.forEach((rel) => { _%>
  <%_ if ([RELATION_TYPE_BELONGS_TO, RELATION_TYPE_HAS_ONE].includes(rel.type)) { _%>
    <td v-if="model.<%= rel.alias.identifier %>_id && <%= rel.alias.identifier %>">
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

    <td class="has-text-right">

      <b-dropdown aria-role="list" position="is-bottom-left">
        <button class="button is-dark is-small" slot="trigger">
          <i class="fa fa-caret-down"></i>
        </button>

        <b-dropdown-item has-link aria-role="menuitem">
          <router-link :to="`/<%= schema.identifier_plural %>/${model.id}`">
            <i class="fa fa-fw fa-eye"></i>
            View
          </router-link>
        </b-dropdown-item>

        <b-dropdown-item has-link aria-role="menuitem">
          <router-link :to="`/<%= schema.identifier_plural %>/${model.id}/edit`">
            <i class="far fa-fw fa-edit"></i>
            Edit
          </router-link>
        </b-dropdown-item>

        <b-dropdown-item aria-role="menuitem" @click="confirmDestroy()">
          <i class="far fa-fw fa-trash-alt"></i>
          Delete
        </b-dropdown-item>
      </b-dropdown>

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
    <%_ schema.relations.forEach((rel, index) => { _%>
    <%= rel.alias.identifier %> () {
      return this.$store.getters['<%= rel.schema.identifier %>/collection/items'].find(m => m.id === this.model.<%= rel.alias.identifier + '_id' %>)
    }<%= helpers.trailingComma(schema.relations, index) %>
    <%_ }) _%>
  },
  methods: {
    confirmDestroy () {
      this.$dialog.confirm({
        title: 'Deleting <%= schema.label %>',
        message: 'Are you sure you want to <b>delete</b> this <%= schema.label %>? This action cannot be undone.',
        confirmText: 'Delete <%= schema.label %>',
        type: 'is-danger',
        onConfirm: () => {
          this.$store.dispatch('<%= schema.identifier %>/collection/destroy', this.model.id)
          this.$toast.open('<%= schema.label %> deleted!')
        }
      })
    }
  }
}
</script>
