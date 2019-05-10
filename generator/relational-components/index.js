module.exports = {
  name: 'RelationalComponents',
  async forEachRelation({ schema, relation, blueprint, configuraion }) {

    // Destination for module / components directory
    const moduleComponentsDest = 'src/modules/' + schema.identifier + '/components/'
    const related_schema = blueprint.schemas.find(s => s.id === relation.related_schema_id)

    // TODO - add HAS_MANY UI
    if (['BELONGS_TO', 'HAS_ONE'].includes(relation.type)) {
      await this.renderComponent({
        src: 'belongs-to-component.vue',
        dest: moduleComponentsDest + 'Related' + relation.alias.class_name + 'Detail.vue',
        data: { schema, related_schema, relation }
      })
    } else if (relation.type === 'HAS_MANY') {
      await this.renderComponent({
        src: 'owns-many-component.vue',
        dest: moduleComponentsDest + 'Related' + relation.alias.class_name_plural + 'List.vue', // TODO - RENAME THIS
        data: { schema, related_schema, relation }
      })

      await this.renderComponent({
        src: 'owns-many-list-item-component.vue',
        dest: moduleComponentsDest + 'Related' + relation.alias.class_name + 'ListItem.vue', // TODO - RENAME THIS
        data: { schema, related_schema, relation }
      })
    }
  },
  async forEachReverseRelation({ schema, relation, blueprint, configuraion }) {
    const moduleComponentsDest = 'src/modules/' + schema.identifier + '/components/'
    const related_schema = blueprint.schemas.find(s => s.id === relation.related_schema_id)

    // TODO - add HAS_MANY UI
    // if (['BELONGS_TO', 'HAS_ONE'].includes(rel.type)) {
    //   await this.renderComponent({
    //     src: 'belongs-to-component.vue',
    //     dest: moduleComponentsDest + 'Related' + rel.alias.class_name + 'Detail.vue',
    //     data: { schema, related_schema, rel }
    //   })
    // } else if (rel.type === 'HAS_MANY') {
    //   await this.renderComponent({
    //     src: 'owns-many-component.vue',
    //     dest: moduleComponentsDest + 'Related' + rel.alias.class_name_plural + 'List.vue', // TODO - RENAME THIS
    //     data: { schema, related_schema, rel }
    //   })
    if (['BELONGS_TO'].includes(relation.type)) {
      await this.renderComponent({
        src: 'owns-many-component.vue',
        dest: moduleComponentsDest + 'Related' + relation.alias.class_name_plural + 'List.vue', // TODO - RENAME THIS
        data: { schema, related_schema, relation }
      })

      await this.renderComponent({
        src: 'owns-many-list-item-component.vue',
        dest: moduleComponentsDest + 'Related' + relation.alias.class_name + 'ListItem.vue', // TODO - RENAME THIS
        data: { schema, related_schema, relation }
      })
    }
  }
};
