import axios from 'axios'
import router from '@/routers'

// FORM MODULE Action Vuex Module
// TODO - ABSTRACT INTO A SEPARATE FILE
// TODO - how much should this be simplified?
export const FORM_MODULE = ({ API_ROOT, NEW_MODEL }) => {
  return Object.assign({}, {
    namespaced: true,
    state: {
      defaultModel: Object.assign({}, NEW_MODEL),
      model: Object.assign({}, NEW_MODEL),
      errors: [],
      loading: false
    },
    mutations: {
      defaultModel (state, defaultModel) {
        state.defaultModel = Object.assign({}, defaultModel)
      },
      reset (state) {
        state.model = Object.assign({}, state.defaultModel)
        state.errors = []
      },
      modelAttr (state, { attribute, value }) {
        state.model[attribute.identifier] = value
      },
      model (state, model) {
        state.model = Object.assign({}, model)
      },
      loading (state, loading) {
        state.loading = loading
      }
    },
    getters: {
      model (state) {
        return state.model
      },
      errors (state) {
        return state.errors
      },
      loading (state) {
        return state.loading
      },
      modelAttr: state => ({ attribute }) => {
        return state.model[attribute.identifier]
      }
    },
    actions: {
      persist ({ state, dispatch }) {
        if (!state.model._id) {
          dispatch('createModel')
        } else {
          dispatch('updateModel')
        }
      },
      createModel ({ state, commit, rootGetters }) {
        commit('loading', true)
        axios.post(API_ROOT, state.model, {
          headers: {
            authorization: rootGetters['auth/authorizationHeader']
          }
        })
        .then(() => {
          commit('loading', false)
          // commit('toast/add', { message: 'Created model', context: 'success', dismissible: true }, { root: true })
          // commit('toast/add', { message: 'Created <%= schema.label %>', context: 'success', dismissible: true }, { root: true })
          // router.push(`/<%= schema.identifier_plural %>`)
          router.back()
        })
        .catch((err) => {
          commit('loading', false)
          // commit('toast/add', { message: 'Create error', context: 'danger', dismissible: true }, { root: true })
          throw err
        })
      },
      updateModel ({ state, commit, rootGetters }) {
        commit('loading', true)
        axios.put(`${API_ROOT}/${state.model._id}`, state.model, {
          headers: {
            authorization: rootGetters['auth/authorizationHeader']
          }
        })
        .then(() => {
          commit('loading', false)
          // commit('toast/add', { message: 'Updated successfully', context: 'success', dismissible: true }, { root: true })
          router.back()
        })
        .catch((err) => {
          commit('loading', false)
          // commit('toast/add', { message: 'Update error', context: 'danger', dismissible: true }, { root: true })
          throw err
        })
      },
    }
  })
}
