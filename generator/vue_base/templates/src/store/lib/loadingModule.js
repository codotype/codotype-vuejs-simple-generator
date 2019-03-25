export default () => {
  return Object.assign({}, {
    state: {
      loading: false
    },
    mutations: {
      loading (state, loading) { state.loading = loading }
    },
    getters: {
      loading (state) { return state.loading }
    }
  })
}
