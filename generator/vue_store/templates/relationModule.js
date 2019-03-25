import axios from 'axios'
import { API_ROOT } from './constants'

// // // //

export default {
  namespaced: true,
  state: {
    loading: false,
    <%_ if ([RELATION_TYPE_BELONGS_TO, RELATION_TYPE_HAS_ONE].includes(rel.type)) { _%>
    model: {}
    <%_ } else if ([RELATION_TYPE_HAS_MANY, 'REF_BELONGS_TO'].includes(rel.type)) { _%>
    collection: []
    <%_ } _%>
  },
  mutations: {
    loading (state, loading) { state.loading = loading },
    <%_ if ([RELATION_TYPE_BELONGS_TO, RELATION_TYPE_HAS_ONE].includes(rel.type)) { _%>
    model (state, model) { state.model = model }
    <%_ } else if ([RELATION_TYPE_HAS_MANY, 'REF_BELONGS_TO'].includes(rel.type)) { _%>
    collection (state, collection) { state.collection = collection }
    <%_ } _%>
  },
  getters: {
    loading: state => state.loading,
    <%_ if ([RELATION_TYPE_BELONGS_TO, RELATION_TYPE_HAS_ONE].includes(rel.type)) { _%>
    model: state => state.model
    <%_ } else if ([RELATION_TYPE_HAS_MANY, 'REF_BELONGS_TO'].includes(rel.type)) { _%>
    collection: state => state.collection
    <%_ } _%>
  },
  actions: {
    <%_ if (rel.type === 'REF_BELONGS_TO') { _%>
    // GET /api/<%= schema.identifier_plural %>/:id/<%= rel.alias.identifier_plural %>
    fetch ({ commit, rootGetters }, <%= schema.identifier %>Id) {
      commit('loading', true)

      axios.get(API_ROOT + '/' + <%= schema.identifier %>Id + '/<%= rel.alias.identifier_plural %>', {
        headers: {
          authorization: rootGetters['auth/authorizationHeader']
        }
      })
      .then(({ data }) => {
        commit('collection', data)
        commit('loading', false)
      })
      .catch((err) => {
        commit('loading', false)
        // commit('toast/add', { message: 'Fetch error', context: 'danger', dismissible: true }, { root: true })
        throw err // TODO - better error handling
      })
    }
    <%_ } else if (rel.type === RELATION_TYPE_HAS_MANY) { _%>
    // GET /api/<%= schema.identifier_plural %>/:id/<%= rel.alias.identifier_plural %>
    fetch ({ commit, rootGetters }, <%= schema.identifier %>Id) {
      commit('loading', true)

      axios.get(API_ROOT + '/' + <%= schema.identifier %>Id + '/<%= rel.alias.identifier_plural %>', {
        headers: {
          authorization: rootGetters['auth/authorizationHeader']
        }
      })
      .then(({ data }) => {
        commit('collection', data)
        commit('loading', false)
      })
      .catch((err) => {
        commit('loading', false)
        // commit('toast/add', { message: 'Fetch error', context: 'danger', dismissible: true }, { root: true })
        throw err // TODO - better error handling
      })
    }
    <%_ } else if ([RELATION_TYPE_BELONGS_TO, RELATION_TYPE_HAS_ONE].includes(rel.type)) { _%>
    // GET /api/<%= schema.identifier_plural %>/:id/<%= rel.alias.identifier %>
    fetch ({ commit, rootGetters }, <%= schema.identifier %>Id) {
      commit('loading', true)
      axios.get(API_ROOT + '/' + <%= schema.identifier %>Id + '/<%= rel.alias.identifier %>', {
        headers: {
          authorization: rootGetters['auth/authorizationHeader']
        }
      })
      .then(({ data }) => {
        commit('model', data)
        commit('loading', false)
      })
      .catch((err) => {
        commit('loading', false)
        // commit('toast/add', { message: 'Fetch error', context: 'danger', dismissible: true }, { root: true })
        throw err // TODO - better error handling
      })
    }
    <%_ } _%>
  }
}