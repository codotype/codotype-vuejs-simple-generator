import axios from 'axios'
import router from '@/routers'

import loginModule from './loginModule'
import logoutModule from './logoutModule'
import profileModule from './profileModule'
import registerModule from './registerModule'
import resetPasswordModule from './resetPasswordModule'
import forgotPasswordModule from './forgotPasswordModule'

export default {
  namespaced: true,
  state: {
    token: localStorage.token || '',
    current_user: {}
  },
  mutations: {
    token (state, token) {
      localStorage.token = token
      state.token = token
    },
    clear_token (state) {
      localStorage.token = ''
      state.token = ''
    },
    current_user (state, currentUser) {
      state.current_user = currentUser
    },
    clear_current_user (state) {
      state.current_user = {}
    }
  },
  getters: {
    is_authenticated: state => {
      if (state.current_user && state.current_user._id) {
        return true
      } else {
        return false
      }
    },
    isAdmin: state => {
      return state.current_user.admin
    },
    current_user: state => {
      return state.current_user
    },
    token: state => {
      return state.token
    },
    authorizationHeader: state => {
      return 'JWT ' + state.token
    }
  },
  modules: {
    login: loginModule,
    logout: logoutModule,
    profile: profileModule,
    register: registerModule,
    reset_password: resetPasswordModule,
    forgot_password: forgotPasswordModule
  }
}
