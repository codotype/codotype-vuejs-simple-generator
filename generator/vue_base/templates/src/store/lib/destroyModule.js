import axios from 'axios'

// EDIT MODULE Action Vuex Module
export const DESTROY_MODULE = ({ API_ROOT }) => {
  return Object.assign({}, {
    // namespaced: true,
    state: {
      loading: false
    },
    mutations: {
      loading (state, loading) {
        state.loading = loading
      }
    },
    getters: {
      loading (state) {
        return state.loading
      }
    },
    actions: {
      destroy ({ getters, commit, rootGetters }, modelId) {
        commit('loading', true)
        axios.delete(`${API_ROOT}/${modelId}`, {
          headers: {
            authorization: rootGetters['auth/authorizationHeader']
          }
        })
        .then(() => {
          commit('loading', false)
          let collection = getters['list/collection'].filter(m => m._id !== modelId)
          commit('list/collection', collection)
          // commit('toast/add', { message: 'Deleted <%= schema.label %>', context: 'success', dismissible: true }, { root: true })
          // router.push(`/<%= schema.identifier_plural %>`)
        })
        .catch((err) => {
          commit('loading', false)
          // commit('toast/add', { message: 'Destroy error', context: 'danger', dismissible: true }, { root: true })
          throw err // TODO - better error handling
        })
      }
    }
  })
}
