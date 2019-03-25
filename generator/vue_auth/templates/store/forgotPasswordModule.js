import axios from 'axios'
import { RESET_ROUTE } from './constants'
import LOADING_MODULE from '@/store/lib/loadingModule'

export default {
  namespaced: true,
  modules: {
    loading: LOADING_MODULE()
  },
  state: {
    email: '',
    done: false
  },
  getters: {
    email: state => state.email,
    done: state => state.done
  },
  mutations: {
    email (state, email) { state.email = email },
    done (state, done) { state.done = done }
  },
  actions: {
    resetForm ({ commit }) {
      commit('email', '')
      commit('done', false)
    },
    submit ({ state, commit }) {
      commit('loading', true)

      // Sends login data to server
      // Handles user.password_reset_token creation
      // Reset link is emailed to the user
      axios({
        method: 'post',
        url: RESET_ROUTE,
        data: {
          email: state.email
        }
      })
      .then(() => {
        commit('done', true)
        commit('loading', false)
      })
      .catch((err) => {
        commit('loading', false)
        // commit('error', err.message)
        // TODO - integrate with TOAST module
      })
    }
  }
}
