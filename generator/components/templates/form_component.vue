<template>
  <div class='columns is-multiline is-mobile'>
  <%_ schema.attributes.forEach((attr) => { _%>
    <div class='column is-half'>

      <b-field
        id="fieldset-<%= attr.identifier %>"
        label="<%= attr.label %>"
        message="<%= attr.help %>"
      >

      <%_ if (attr.datatype === DATATYPE_BOOLEAN) { _%>
        <b-switch v-model="<%= attr.identifier %>"></b-switch>
      <%_ } else if (attr.datatype === DATATYPE_STRING) { _%>
        <b-input
          trim
          id="<%= attr.identifier %>-input"
          :required="<%= attr.required %>"
          placeholder="<%= attr.label %>"
          v-model="model.<%=attr.identifier%>"
        />
      <%_ } else if (attr.datatype === DATATYPE_STRING_ARRAY) { _%>
        <b-taginput
            ellipsis
            v-model="<%= attr.identifier %>"
            icon="label"
            placeholder="Add a <%= attr.label %>">
        </b-taginput>
      <%_ } else if (attr.datatype === DATATYPE_INTEGER) { _%>
        <b-input
          type="number"
          step="1"
          id="<%= attr.identifier %>-input"
          :required="<%= attr.required %>"
          placeholder="<%= attr.label %>"
          v-model="model.<%=attr.identifier%>"
        />
      <%_ } else if ([DATATYPE_FLOAT, DATATYPE_DOUBLE].includes(attr.datatype)) { _%>
        <b-input
          type="number"
          id="<%= attr.identifier %>-input"
          :required="<%= attr.required %>"
          placeholder="<%= attr.label %>"
          v-model="model.<%=attr.identifier%>"
        />
      <%_ } else if (attr.datatype === DATATYPE_DATE) { _%>
        <b-input
          type="date"
          id="<%= attr.identifier %>-input"
          :required="<%= attr.required %>"
          placeholder="<%= attr.label %>"
          v-model="model.<%=attr.identifier%>"
        />
      <%_ } else if (attr.datatype === DATATYPE_TIME) { _%>
        <b-input
          type="time"
          id="<%= attr.identifier %>-input"
          :required="<%= attr.required %>"
          placeholder="<%= attr.label %>"
          v-model="model.<%=attr.identifier%>"
        />
      <%_ } else if (attr.datatype === DATATYPE_DATETIME) { _%>
        <b-input
          type="datetime-local"
          id="<%= attr.identifier %>-input"
          :required="<%= attr.required %>"
          placeholder="<%= attr.label %>"
          v-model="model.<%=attr.identifier%>"
        />
      <%_ } else if (attr.datatype === DATATYPE_JSON) { _%>
        <!-- <textarea
          class="form-control"
          placeholder="<%= attr.label %>"
          @change="model.<%=attr.identifier%> = JSON.parse($event.target.value)">{{ JSON.stringify(model.<%=attr.identifier%>, null, 2) }}</textarea> -->
          <p class="text-warning">TODO TODO TODO</p>
          <small>IMPLEMENT JSON EDITING HERE</small>
      <%_ } _%>
      </b-field>
    </div>

    <%_ }) _%>
    <%_ schema.relations.forEach((rel) => { _%>
    <%_ if ([RELATION_TYPE_BELONGS_TO, RELATION_TYPE_HAS_ONE, RELATION_TYPE_HAS_MANY].includes(rel.type)) { _%>
    <div class="column is-half">
      <b-field
        id="fieldset-<%= rel.alias.identifier %>"
        label="<%= rel.alias.label %>"
        message="The related <%= rel.alias.label %>"
      >
        <%_ if (rel.type === RELATION_TYPE_BELONGS_TO) { _%>
        <b-select
          expanded
          placeholder="<%= rel.alias.label %>"
          v-model="model.<%=rel.alias.identifier%>_id"
        >
          <option disabled selected value> -- <%= rel.alias.label_plural %> -- </option>
          <option
            :value="<%=rel.schema.identifier%>.id"
            v-for="<%= rel.schema.identifier %> in <%= rel.alias.identifier_plural %>"
            :key="<%= rel.schema.identifier %>.id"
          >
            {{ <%= rel.schema.identifier %>.<%= rel.related_lead_attribute %> }}
          </option>
        </b-select>
      <%_ } else if (rel.type === RELATION_TYPE_HAS_MANY) { _%>
        <b-select
          expanded
          multiple
          placeholder="<%= rel.alias.label %>"
          v-model="model.<%=rel.alias.identifier%>_ids"
        >
          <option disabled selected value> -- <%= rel.alias.label_plural %> -- </option>
          <option
            :value="<%=rel.schema.identifier%>.id"
            v-for="<%= rel.schema.identifier %> in <%= rel.alias.identifier_plural %>"
            :key="<%= rel.schema.identifier %>.id"
          >
            {{ <%= rel.schema.identifier %>.<%= rel.related_lead_attribute %> }}
          </option>
        </b-select>
      <%_ } else if (rel.type === RELATION_TYPE_HAS_ONE) { _%>
        <b-select
          type="text"
          class="form-control"
          placeholder="<%= rel.alias.label %>"
          v-model="model.<%=rel.alias.identifier%>_id"
        >
          <option disabled selected value> -- <%= rel.alias.label_plural %> -- </option>
          <option
            :value="<%=rel.schema.identifier%>.id"
            v-for="<%= rel.schema.identifier %> in <%= rel.alias.identifier_plural %>"
            :key="<%= rel.schema.identifier %>.id"
          >
            {{ <%= rel.schema.identifier %>.<%= rel.related_lead_attribute %> }}
          </option>
        </b-select>
      <%_ } _%>
      </b-field>
    </div>

    <%_ } _%>
    <%_ }) _%>
  </div>
</template>

<!-- // // // //  -->

<script>

export default {
  name: '<%= schema.class_name %>Form',
  props: {
    model: {
      required: true
    }
  },
  computed: {
    <%_ schema.relations.forEach((rel, index) => { _%>
    <%= rel.alias.identifier_plural %> () {
      return this.$store.getters['<%= rel.schema.identifier %>/collection/items']
    }<%= helpers.trailingComma(schema.relations, index) %>
    <%_ }) _%>
  }
}
</script>
