import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

<%_ blueprint.schemas.forEach((schema) => { _%>
import <%= schema.identifier %> from '@/modules/<%= schema.identifier %>/store'
<%_ }) _%>

// Vuex Initialization
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    <%= blueprint.schemas.map(s => s.identifier).join(',\n    ') %>
  },
  plugins: [createPersistedState()]
})
