// import { NEW_<%= schema.identifier.toUpperCase() %> } from './constants'

// <%= schema.label %> Module Mutations
export default {
  <%_ api_actions.filter(a => a.payload).forEach((action) => { _%>
  <%= action.function_name %>Payload (state, <%= action.function_name %>Payload) {
    state.<%= action.function_name %>Payload = <%= action.function_name %>Payload
  },
  <%_ }) _%>
}
