import axios from 'axios'
import router from '@/routers'
import { LOGIN_ROUTE } from './constants'

import LOADING_MODULE from '@/store/lib/loadingModule'

export default {
  namespaced: true,
  modules: {
    loading: LOADING_MODULE()
  },
  mutations: {
    token (state, token) { state.token = token }
  },
  actions: {
    submit ({ commit, state, dispatch }, user) {
      commit('loading', true)

      // Authenticates user with server
      return axios({
        method: 'post',
        url: LOGIN_ROUTE,
        data: {
          email: user.email,
          password: user.password
        }
      })
      .then(({ data }) => {
        // Changes loading state
        commit('loading', false)

        // Updates store.token
        commit('auth/token', data.token, { root: true })

        // Pulls current user data from server response
        const { email, admin, _id, role } = data
        commit('auth/current_user', { email, admin, _id, role }, { root: true })

        // Shows success notification
        dispatch('toast/success', { message: 'Successfully authenticated' }, { root: true })

        // Redirects to home page
        router.push('/')
      })
      .catch((err) => {
        commit('loading', false)
        dispatch('toast/error', { message: err.message }, { root: true })
        throw err
      })
    }
  }
}
