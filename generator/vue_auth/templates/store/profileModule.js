import axios from 'axios'
import router from '@/routers'
import {
  PROFILE_ROUTE,
} from './constants'

import LOADING_MODULE from '@/store/lib/loadingModule'

// TODO - needs error handling!!
export default {
  namespaced: true,
  modules: {
    loading: LOADING_MODULE()
  },
  state: {
    user: {}
  },
  mutations: {
    user (state, currentUser) { state.user = currentUser },
    clear_user (state) { state.user = Object.assign({}, {}) }
  },
  getters: {
    user: state => { return state.user },
  },
  actions: {
    fetch ({ getters, commit, dispatch }) {
      return new Promise((resolve, reject) => {
        // Prevents unnecssary fetch on client start
        if (!getters['token']) {
          commit('clear_token')
          commit('clear_current_user')
          commit('logging_in', false)
          return resolve()
        }

        commit('logging_in', true)

        axios.get(PROFILE_ROUTE, {
          headers: {
            authorization: getters['authorizationHeader']
          }
        })
        .then(({ data }) => {
          commit('current_user', data)
          commit('logging_in', false)
          return resolve(data)
        })
        .catch((err) => {
          commit('clear_token')
          commit('clear_current_user')
          commit('logging_in', false)
          dispatch('toast/error', { message: err.message }, { root: true })
        })
      })
    }
  }
}
