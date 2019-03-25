import router from '@/routers'

export default {
  actions: {
    logout ({ commit }) {
      commit('clear_token')
      commit('clear_current_user')
      router.push('/auth/login')
    }
  }
}
