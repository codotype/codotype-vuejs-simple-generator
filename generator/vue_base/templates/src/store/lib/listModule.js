import axios from 'axios'

export const LIST_MODULE = ({ API_ROOT }) => {
  return Object.assign({}, {
    namespaced: true,
    state: {
      collection: [],
      loading: false,
      currentPage: 0,
      pageSize: 10,
      count: 0,
      filter: ''
    },
    getters: {
      collection: state => state.collection,
      loading: state => state.loading,
      currentPage: state => state.currentPage,
      pageSize: state => state.pageSize,
      count: state => state.count,
      filter: state => state.filter
    },
    mutations: {
      collection (state, collection) { state.collection = collection },
      loading (state, loading) { state.loading = loading },
      currentPage (state, page) { state.currentPage = page },
      pageSize (state, newSize) { state.pageSize = newSize },
      count (state, count) { state.count = count },
      filter (state, filter) { state.filter = filter }
    },
    actions: {
      setFilter ({ commit, dispatch }, filter) {
        commit('filter', filter)
        commit('currentPage', 0)
        dispatch('fetch')
      },
      goToPage ({ commit, dispatch }, page) {
        commit('currentPage', page)
        dispatch('fetch')
      },
      fetch ({ state, commit, rootGetters }) {
        commit('loading', true)
        let apiRoot
        if (state.filter) {
          apiRoot = API_ROOT + '/search'
        } else {
          apiRoot = API_ROOT
        }
        return axios.get(apiRoot, {
          headers: {
            authorization: rootGetters['auth/authorizationHeader']
          },
          params: {
            search: state.filter,
            page: state.currentPage,
            per_page: state.pageSize
          }
        })
        .then(({ data }) => {
          commit('collection', data.items)
          commit('pageSize', data.per_page)
          commit('currentPage', data.page)
          commit('count', data.count)
          commit('loading', false)
        })
        .catch((err) => {
          commit('loading', false)
          // commit('toast/add', { message: 'Fetch error', context: 'danger', dismissible: true }, { root: true })
          throw err // TODO - better error handling
        })
      }
    }
  })
}
