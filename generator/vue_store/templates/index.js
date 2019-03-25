<%_ let filteredActions = api_actions.filter(a => ['POST', 'PUT'].includes(a.verb) && a.payload) _%>
<%_ if (filteredActions.length) { _%>
import { API_ACTION_MODULE } from '@/store/lib/mixins'
<%_ } _%>

// CRUD Modules
import { API_ROOT, NEW_<%= schema.identifier.toUpperCase() %> } from './constants'
import { COLLECTION_MODULE } from '@/store/lib/collectionModule'
import { LIST_MODULE } from '@/store/lib/listModule'
import { NEW_MODULE } from '@/store/lib/newModule'
import { SHOW_MODULE } from '@/store/lib/showModule'
import { EDIT_MODULE } from '@/store/lib/editModule'
import { DESTROY_MODULE } from '@/store/lib/destroyModule'
import { FORM_MODULE } from '@/store/lib/formModule' // TODO - retire this?

// Relation modules
<%_ schema.relations.forEach((rel, index) => { _%>
<%_ if (rel.type === 'REF_BELONGS_TO') { _%>
import related<%= rel.alias.class_name_plural %>Module from './related<%= rel.alias.class_name_plural %>Module'
<%_ } else if (rel.type === RELATION_TYPE_HAS_MANY) { _%>
import related<%= rel.alias.class_name_plural %>Module from './related<%= rel.alias.class_name_plural %>Module'
<%_ } else if ([RELATION_TYPE_BELONGS_TO, RELATION_TYPE_HAS_ONE].includes(rel.type)) { _%>
import related<%= rel.alias.class_name %>Module from './related<%= rel.alias.class_name %>Module'
<%_ } _%>
<%_ }) _%>

// <%= schema.label %> Vuex module definition
export default {
  namespaced: true,
  modules: {
    list: LIST_MODULE({ API_ROOT }),
    new: NEW_MODULE({ API_ROOT, NEW_MODEL: NEW_<%= schema.identifier.toUpperCase() %> }),
    show: SHOW_MODULE({ API_ROOT }),
    edit: EDIT_MODULE({ API_ROOT }),
    destroy: DESTROY_MODULE({ API_ROOT }),
    form: FORM_MODULE({ API_ROOT, NEW_MODEL: NEW_<%= schema.identifier.toUpperCase() %> }),
    collection: COLLECTION_MODULE({ API_ROOT }),
    <%_ schema.relations.forEach((rel, index) => { _%>
    <%_ if (rel.type === 'REF_BELONGS_TO') { _%>
    related<%= rel.alias.class_name_plural %>: related<%= rel.alias.class_name_plural %>Module,
    <%_ } else if (rel.type === RELATION_TYPE_HAS_MANY) { _%>
    related<%= rel.alias.class_name_plural %>: related<%= rel.alias.class_name_plural %>Module,
    <%_ } else if ([RELATION_TYPE_BELONGS_TO, RELATION_TYPE_HAS_ONE].includes(rel.type)) { _%>
    related<%= rel.alias.class_name %>: related<%= rel.alias.class_name %>Module,
    <%_ } _%>
    <%_ }) _%>
    <%_ filteredActions.forEach((action, index) => { _%>
    <%= action.uri %>: API_ACTION_MODULE()<%= helpers.trailingComma(filteredActions, index) %>
    <%_ }) _%>
  }
}
