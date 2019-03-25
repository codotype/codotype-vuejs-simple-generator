import axios from 'axios'

export const COLLECTION_MODULE = ({ API_ROOT }) => {
  return Object.assign({}, {
    namespaced: true,
    state: {
      collection: [],
      loading: false
    },
    getters: {
      collection: state => state.collection,
      loading: state => state.loading
    },
    mutations: {
      collection (state, collection) {
        state.collection = collection
      },
      loading (state, loading) {
        state.loading = loading
      }
    },
    actions: {
      fetch ({ commit, rootGetters }) {
        commit('loading', true)
        return axios.get(API_ROOT, {
          headers: {
            authorization: rootGetters['auth/authorizationHeader']
          }
        })
        .then(({ data }) => {
          commit('collection', data.items)
          commit('loading', false)
        })
        .catch((err) => {
          commit('loading', false)
          commit('toast/add', { message: 'Fetch error', context: 'danger', dismissible: true }, { root: true })
          throw err // TODO - better error handling
        })
      }
    }
  })
}
