// TODO - replace router here - instead,
// emit an event and have it handled by another Vuex module
import router from '@/routers'
import axios from 'axios'
import { API_ROOT } from './constants'

// // // //

export default {
  // ...FILTER_ACTIONS('<%= schema.identifier %>'), // TODO - retire this
  // GET /api/<%= schema.identifier_plural %>
  // GET /api/<%= schema.identifier_plural %>/:id
  <%_ if (api_actions) { _%>
  <%_ api_actions.filter(a => a.scope === 'ROOT').forEach((action) => { _%>
  // <%= action.verb %> /api/<%= action.function_name %>/<%= action.uri %>
  <%_ if (['POST','PUT'].includes(action.verb)) { _%>
  <%= action.function_name %> ({ commit, rootGetters }, payload) {
    axios.post(API_ROOT + '/<%= action.uri %>', payload, {
      headers: {
        authorization: rootGetters['auth/authorizationHeader']
      }
    })
    .then(() => {
      // commit('fetching', false)
      // commit('toast/add', { message: '<%= action.label %> Success', context: 'success', dismissible: true }, { root: true })
    })
  <%_ } else if ('GET' === action.verb) { _%>
  <%= action.function_name %> ({ commit, rootGetters }) {
    axios.get(API_ROOT + '/<%= action.uri %>', {
      headers: {
        authorization: rootGetters['auth/authorizationHeader']
      }
    })
    .then(() => {
      // commit('fetching', false)
    })
  <%_ } _%>
    .catch((err) => {
      // commit('fetching', false)
      commit('toast/add', { message: 'Fetch error', context: 'danger', dismissible: true }, { root: true })
      throw err // TODO - better error handling
    })
  },
  <%_ }) _%>

  <%_ api_actions.filter(a => a.scope === 'MODEL').forEach((action) => { _%>
  // <%= action.verb %> /api/<%= action.function_name %>/:id/<%= action.uri %>
  <%_ if (action.payload) { _%>
  <%= action.function_name %> ({ state, commit, getters, rootGetters }) {
    const scope = getters['<%= action.uri %>/scope']
    const payload = getters['<%= action.uri %>/payload']
  <%_ } else { _%>
  <%= action.function_name %> ({ state, commit, rootGetters }, <%= schema.identifier %>Id) {
  <%_ } _%>
    <%_ if (action.verb === 'POST') { _%>
    <%_ if (action.payload) { _%>
    axios.post([API_ROOT, scope, '<%= action.uri %>'].join('/'), payload, {
    <%_ } else { _%>
    axios.post(API_ROOT + '/' + <%= schema.identifier %>Id + '/<%= action.uri %>', {}, {
    <%_ } _%>
      headers: {
        authorization: rootGetters['auth/authorizationHeader']
      }
    })
    <%_ } else if (action.verb === 'PUT') { _%>

    <%_ if (action.payload) { _%>
    axios.put([API_ROOT, scope, '<%= action.uri %>'].join('/'), payload, {
    <%_ } else { _%>
    axios.put(API_ROOT + '/' + <%= schema.identifier %>Id + '/<%= action.uri %>', {}, {
    <%_ } _%>
      headers: {
        authorization: rootGetters['auth/authorizationHeader']
      }
    })
    <%_ } _%>
    .then(({ data }) => {
      let collection = state.collection.map(m => m._id === data._id ? data : m)
      commit('collection', collection)
      // commit('fetching', false)
      commit('toast/add', { message: '<%= action.label %> Success', context: 'success', dismissible: true }, { root: true })
    })
    .catch((err) => {
      // commit('fetching', false)
      commit('toast/add', { message: 'Fetch error', context: 'danger', dismissible: true }, { root: true })
      throw err // TODO - better error handling
    })
  },
  <%_ }) _%>
  <%_ } _%>
}