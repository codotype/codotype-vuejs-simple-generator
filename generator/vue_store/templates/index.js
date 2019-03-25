import COLLECTION_MODULE from '@/store/lib/collectionModule'
import { NEW_<%= schema.identifier.toUpperCase() %> } from './constants'

// <%= schema.label %> Vuex module definition
export default {
  namespaced: true,
  modules: {
    collection: COLLECTION_MODULE({ NEW_MODEL: NEW_<%= schema.identifier.toUpperCase() %> })
  }
}
