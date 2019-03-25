
// <%= schema.label %> Module State
export default {
  <%_ api_actions.filter(a => a.payload).forEach((action) => { _%>
  <%= action.function_name %>Payload: {},
  <%_ }) _%>
}
