
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

    // src/modules/resource/components/ResourceList.vue
    await this.copyTemplate(
      this.templatePath('list-component.vue'),
      this.destinationPath(moduleComponentsDest + schema.class_name + 'List.vue'),
      { schema }
    );

    // src/modules/resource/components/ResourceListItem.vue
    await this.copyTemplate(
      this.templatePath('list-item-component.vue'),
      this.destinationPath(moduleComponentsDest + schema.class_name + 'ListItem.vue'),
      { schema }
    );

    // src/modules/resource/components/ResourceDetail.vue
    // src/components/resource_ListWidget.vue
    await this.copyTemplate(
      this.templatePath('detail-component.vue'),
      this.destinationPath(moduleComponentsDest + schema.class_name + 'Detail.vue'),
      { schema }
    );

  }

};
