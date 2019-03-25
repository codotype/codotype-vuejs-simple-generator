import Vue from 'vue'
import Router from 'vue-router'

// Module routes
<%- routeImports %>

// Vue Router setup
Vue.use(Router)

// Exports new Router instance
export default new Router({
  routes: [
    <%= routeModules %>
  ]
})
