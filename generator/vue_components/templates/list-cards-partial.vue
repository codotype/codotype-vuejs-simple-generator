<template>
  <b-row>

    <!-- Empty Card -->
    <div class="col-lg-4" v-if="!collection[0]">
      <div class='card card-body border-warning text-warning'>
        No <%= schema.label_plural %> available
      </div>
    </div>

    <div class="col-lg-4" v-for="m in collection" :key="m._id">
      <div class='card'>

          <div class="card-header">
            <%_ let headerEl = false _%>
            <%_ schema.attributes.forEach((attr, index) => { _%>
            <%_ if (headerEl) { return }_%>
            <%_ if (attr.unique) { _%>
            <router-link :to=" '/<%= schema.identifier_plural %>/' + m._id ">
              {{ m.<%=attr.identifier%> }}
            </router-link>
            <%_ headerEl = true _%>
            <%_ } else { _%>
            <td>{{m.<%= schema.attributes[index].identifier %>}}</td>
            <%_ } _%>
            <%_ }) _%>
          </div>

          <div class='card-body'>

            <%_ schema.attributes.forEach((attr, index) => { _%>
            <%_ if (attr.datatype === 'BOOLEAN') { _%>
            <span>
              <%= attr.label %>:
              <i class="fas fa-fw fa-check-square" v-if="m.<%=attr.identifier%>"></i>
              <i class="fa fa-fw fa-square-o" v-if="!m.<%=attr.identifier%>"></i>
            </span>
            <%_ } else if (attr.datatype === 'STRING_ARRAY') { _%>
            <p class="card-text">{{m.<%= schema.attributes[index].identifier %>.join(', ')}}</p>
            <%_ } else { _%>
            <p class="card-text">{{m.<%= schema.attributes[index].identifier %>}}</p>
            <%_ } _%>
            <%_ }) _%>

            <%_ schema.relations.forEach((rel) => { _%>
            <%_ if ([RELATION_TYPE_BELONGS_TO, RELATION_TYPE_HAS_ONE].includes(rel.type)) { _%>
            <p class="card-text" v-if="m.<%= rel.alias.identifier %>_id">
              <router-link :to="'/<%= rel.schema.identifier_plural %>/' + m.<%= rel.alias.identifier + '_id' %>">
                {{m.<%= rel.alias.identifier %>.<%= rel.related_lead_attribute %>}}
              </router-link>
            </p>
            <%_ } else if (rel.type === RELATION_TYPE_HAS_MANY) { _%>
            <!-- <p class="card-text" v-else>N/A</p> -->
            <p class="card-text">
              {{ m.<%=rel.alias.identifier %>_ids.length }} <%=rel.alias.label_plural %>
            </p>
            <%_ } _%>
            <%_ }) _%>
          </div>

          <!-- Edit <%= schema.label %>-->
          <div class="card-footer">
            <button size="sm" variant="outline-primary" :to=" '/<%= schema.identifier_plural %>/' + m._id">
              <i class="fa fa-fw fa-eye"></i>
            </button>

            <button size="sm" variant="outline-warning" :to=" '/<%= schema.identifier_plural %>/' + m._id + '/edit' ">
              <i class="far fa-fw fa-edit"></i>
            </button>

            <button size="sm" variant="outline-danger" v-b-modal="'modal_' + m._id">
              <i class="far fa-fw fa-trash-alt"></i>
            </button>

            <!-- Bootstrap Modal Component -->
            <b-modal :id="'modal_' + m._id"
              :title="'Destroy <%= schema.label %>?'"
              @ok="onConfirmDestroy(m._id)"
              ok-variant='danger'
              ok-title='DESTROY'
              cancel-title='Cancel'
            >
              <p class="text-left">Are you sure you want to destroy this <%= schema.label %>?</p>
            </b-modal>
          </div>

        </div>

    </div>
  </b-row>
</template>

<!-- // // // //  -->

<script>
import { mapActions } from 'vuex'

export default {
  props: ['collection'],
  methods: mapActions({
    onConfirmDestroy: '<%= schema.identifier %>/destroy'
  })
}
</script>
