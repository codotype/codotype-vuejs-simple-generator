// import axios from 'axios'

// API Action Vuex Module
// TODO - annotate the purpose and usage of this mixin
// TODO - ABSTRACT ELSEWHERE??
export const API_ACTION_MODULE = () => {
  return Object.assign({}, {
    namespaced: true,
    state: {
      scope: '',
      payload: {},
      showingModal: false
    },
    getters: {
      scope: state => state.scope,
      payload: state => state.payload,
      showingModal: state => state.showingModal
    },
    mutations: {
      state (state, newState) {
        state.scope = newState.scope
        state.payload = newState.payload
        state.showingModal = newState.showingModal
      },
      scope (state, scope) {
        state.scope = scope
      },
      payload (state, payload) {
        state.payload = payload
      },
      showingModal (state, bool) {
        state.showingModal = bool
      }
    },
    actions: {}
  })
}
