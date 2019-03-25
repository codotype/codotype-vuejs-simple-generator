import axios from 'axios'
import router from '@/routers'
import { RESET_PASSWORD_ROUTE } from './constants'
import LOADING_MODULE from '@/store/lib/loadingModule'

// TODO - needs error handling!!
export default {
  namespaced: true,
  modules: {
    loading: LOADING_MODULE()
  },
  state: {
    password: 'reverse',
    password_verify: 'reverse',
    password_reset_token: '',
    error: '',
    done: false
  },
  getters: {
    password: state => state.password,
    password_verify: state => state.password_verify,
    verified: state => !(state.password && state.password_verify && state.password === state.password_verify),
    password_reset_token: state => state.password_reset_token,
    error: state => state.error,
    done: state => state.done
  },
  mutations: {
    password (state, password) { state.password = password },
    password_verify (state, password_verify) { state.password_verify = password_verify },
    password_reset_token (state, password_reset_token) { state.password_reset_token = password_reset_token },
    error (state, error) { state.error = error },
    done (state, done) { state.done = done }
  },
  actions: {
    submit ({ state, commit }) {
      commit('loading', true)

      // Handles resetting user password
      axios({
        method: 'post',
        url: RESET_PASSWORD_ROUTE,
        data: {
          password: state.password,
          password_reset_token: state.password_reset_token
        }
      })
      .then(() => {
        commit('done', true)
        commit('loading', false)
        commit('password', '')
        commit('password_verify', '')
        router.push('/auth/login')
      })
      .catch((err) => {
        commit('loading', false)
        commit('error', err.message)
      })
    }
  }
}
