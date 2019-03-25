import axios from 'axios'

// MODEL MODULE Action Vuex Module
// TODO - ABSTRACT INTO A SEPARATE FILE
export const SHOW_MODULE = ({ API_ROOT }) => {
  return Object.assign({}, {
    namespaced: true,
    state: {
      model: {},
      loading: false
    },
    mutations: {
      model (state, model) {
        state.model = Object.assign({}, model)
      },
      loading (state, loading) {
        state.loading = loading
      }
    },
    getters: {
      model (state) { return state.model },
      loading (state) { return state.loading }
    },
    actions: {
      fetch ({ commit, rootGetters }, modelId) {
        commit('loading', true)
        axios.get(`${API_ROOT}/${modelId}`, {
          headers: {
            authorization: rootGetters['auth/authorizationHeader']
          }
        })
        .then(({ data }) => {
          commit('model', data)
          commit('loading', false)
          // commit('toast/add', { message: 'Created <%= schema.label %>', context: 'success', dismissible: true }, { root: true })
          // router.push(`/<%= schema.identifier_plural %>`)
        })
        .catch((err) => {
          commit('loading', false)
          commit('toast/add', { message: 'Fetch Error', context: 'danger', dismissible: true }, { root: true })
          throw err
        })
      }
    }
  })
}
