
module.exports = {
  name: 'ModuleComponents',
  async forEachSchema({ blueprint, configuration, schema }) {

    // Destination for module / components directory
    const moduleComponentsDest = 'src/modules/' + schema.identifier + '/components/'

    // Ensures module components directory
    this.ensureDir(moduleComponentsDest)

    // src/modules/resource/components/ResourceForm.vue
    await this.renderComponent({
      src: 'form_component.vue',
      dest: moduleComponentsDest + schema.class_name + 'Form.vue',
      data: { schema }
    })

    // src/modules/resource/components/ResourceList.vue
    await this.renderComponent({
      src: 'list-component.vue',
      dest: moduleComponentsDest + schema.class_name + 'List.vue',
      data: { schema }
    });

    // src/modules/resource/components/ResourceListItem.vue
    await this.renderComponent({
      src: 'list-item-component.vue',
      dest: moduleComponentsDest + schema.class_name + 'ListItem.vue',
      data: { schema }
    });

    // src/modules/resource/components/ResourceDetail.vue
    // src/components/resource_ListWidget.vue
    await this.renderComponent({
      src: 'detail-component.vue',
      dest: moduleComponentsDest + schema.class_name + 'Detail.vue',
      data: { schema }
    });

  }

};
