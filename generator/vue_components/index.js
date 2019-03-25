
module.exports = {
  name: 'ModuleComponents',
  async forEachSchema({ blueprint, configuration, schema }) {

    // Destination for module / components directory
    const moduleComponentsDest = 'src/modules/' + schema.identifier + '/components/'

    // Ensures module components directory
    this.ensureDir(moduleComponentsDest)

    // src/modules/resource/components/ResourceForm.vue
    await this.copyTemplate(
      this.templatePath('form_component.vue'),
      this.destinationPath(moduleComponentsDest + schema.class_name + 'Form.vue'),
      { schema }
    )

    // src/modules/resource/components/ResourceListWidget.vue
    await this.copyTemplate(
      this.templatePath('list-component.vue'),
      this.destinationPath(moduleComponentsDest + schema.class_name + 'List.vue'),
      { schema }
    );
    // src/modules/resource/components/ResourceDetail.vue
    // src/components/resource_ListWidget.vue
    await this.copyTemplate(
      this.templatePath('detail-component.vue'),
      this.destinationPath(moduleComponentsDest + schema.class_name + 'Detail.vue'),
      { schema }
    );

    // Generate relational components
    // schema.relations.forEach(async (rel) => {
    let rel;
    let related_schema;
    for (var j = schema.relations.length - 1; j >= 0; j--) {
      rel = schema.relations[j]

      related_schema = blueprint.schemas.find(s => s.id === rel.related_schema_id)
      // TODO - add HAS_MANY UI
      if (['BELONGS_TO', 'HAS_ONE'].includes(rel.type)) {
        await this.copyTemplate(
          this.templatePath('belongs-to-component.vue'),
          this.destinationPath(moduleComponentsDest + 'Related' + rel.alias.class_name + 'Detail.vue'),
          { schema, related_schema, rel }
        )
      } else if (rel.type === 'HAS_MANY') {
        await this.copyTemplate(
          this.templatePath('owns-many-component.vue'),
          this.destinationPath(moduleComponentsDest + 'Related' + rel.alias.class_name_plural + 'List.vue'), // TODO - RENAME THIS
          { schema, related_schema, rel }
        )
      } else if (rel.type === 'REF_BELONGS_TO') {
        await this.copyTemplate(
          this.templatePath('owns-many-component.vue'),
          this.destinationPath(moduleComponentsDest + 'Related' + rel.alias.class_name_plural + 'List.vue'), // TODO - RENAME THIS
          { schema, related_schema, rel }
        )
      }

    }

  }

};
