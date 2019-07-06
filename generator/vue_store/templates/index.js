import COLLECTION_MODULE from '@/store/lib/collectionModule'

const NEW_<%= schema.identifier.toUpperCase() %> = <%- newModel %>

// <%= schema.label %> Vuex module definition
export default {
  namespaced: true,
  modules: {
    collection: COLLECTION_MODULE({ NEW_MODEL: NEW_<%= schema.identifier.toUpperCase() %> })
  }
}
