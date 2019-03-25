
module.exports = {
  name: 'RelationalComponents',
  async forEachSchema({ blueprint, configuration, schema }) {

    // Destination for module / components directory
    const moduleComponentsDest = 'src/modules/' + schema.identifier + '/components/'

    // // // //
    // // // //
    // TODO - move into a separate generator component?
    // TODO - move into a separate generator component?
    // TODO - move into a separate generator component?

    // Generate relational components
    let relation;
    let related_schema;

    for (var j = schema.relations.length - 1; j >= 0; j--) {
      relation = schema.relations[j]

      related_schema = blueprint.schemas.find(s => s.id === relation.related_schema_id)
      // TODO - add HAS_MANY UI
      if (['BELONGS_TO', 'HAS_ONE'].includes(relation.type)) {
        await this.copyTemplate(
          this.templatePath('belongs-to-component.vue'),
          this.destinationPath(moduleComponentsDest + 'Related' + relation.alias.class_name + 'Detail.vue'),
          { schema, related_schema, relation }
        )
      } else if (relation.type === 'HAS_MANY') {
        await this.copyTemplate(
          this.templatePath('owns-many-component.vue'),
          this.destinationPath(moduleComponentsDest + 'Related' + relation.alias.class_name_plural + 'List.vue'), // TODO - RENAME THIS
          { schema, related_schema, relation }
        )

        await this.copyTemplate(
          this.templatePath('owns-many-list-item-component.vue'),
          this.destinationPath(moduleComponentsDest + 'Related' + relation.alias.class_name + 'ListItem.vue'), // TODO - RENAME THIS
          { schema, related_schema, relation }
        )
      }

    }

    // // // //
    // // // //

    // TODO - move into a separate generator?
    // TODO - move into a separate generator?
    // TODO - move into a separate generator?
    for (var j = schema.reverse_relations.length - 1; j >= 0; j--) {
      relation = schema.reverse_relations[j]

      related_schema = blueprint.schemas.find(s => s.id === relation.related_schema_id)
      // TODO - add HAS_MANY UI
      // if (['BELONGS_TO', 'HAS_ONE'].includes(rel.type)) {
      //   await this.copyTemplate(
      //     this.templatePath('belongs-to-component.vue'),
      //     this.destinationPath(moduleComponentsDest + 'Related' + rel.alias.class_name + 'Detail.vue'),
      //     { schema, related_schema, rel }
      //   )
      // } else if (rel.type === 'HAS_MANY') {
      //   await this.copyTemplate(
      //     this.templatePath('owns-many-component.vue'),
      //     this.destinationPath(moduleComponentsDest + 'Related' + rel.alias.class_name_plural + 'List.vue'), // TODO - RENAME THIS
      //     { schema, related_schema, rel }
      //   )
      if (['BELONGS_TO'].includes(relation.type)) {
        await this.copyTemplate(
          this.templatePath('owns-many-component.vue'),
          this.destinationPath(moduleComponentsDest + 'Related' + relation.alias.class_name_plural + 'List.vue'), // TODO - RENAME THIS
          { schema, related_schema, relation }
        )

        await this.copyTemplate(
          this.templatePath('owns-many-list-item-component.vue'),
          this.destinationPath(moduleComponentsDest + 'Related' + relation.alias.class_name + 'ListItem.vue'), // TODO - RENAME THIS
          { schema, related_schema, relation }
        )
      }

    }

    // // // //
    // // // //

  }

};
