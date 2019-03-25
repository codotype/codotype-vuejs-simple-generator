import axios from 'axios'
import router from '@/routers'

// TODO - ABSTRACT INTO A SEPARATE FILE
// TODO - DOCUMENT
// TODO - IMPLEMENT NEW_MODEL
export const NEW_MODULE = ({ API_ROOT, NEW_MODEL }) => {
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
      create ({ state, commit, rootGetters }) {
        commit('loading', true)
        axios.post(API_ROOT, state.model, {
          headers: {
            authorization: rootGetters['auth/authorizationHeader']
          }
        })
        .then(() => {
          commit('loading', false)
          // commit('toast/add', { message: 'Created model', context: 'success', dismissible: true }, { root: true })
          // commit('toast/add', { message: 'Created <%= schema.label %>', context: 'success', dismissible: true }, { root: true })
          // router.push(`/<%= schema.identifier_plural %>`)
          router.back()
        })
        .catch((err) => {
          commit('loading', false)
          // commit('toast/add', { message: 'Create error', context: 'danger', dismissible: true }, { root: true })
          throw err
        })
      },
    }
  })
}
