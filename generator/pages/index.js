
module.exports = {
  name: 'ModulePages',
  async forEachSchema({ blueprint, configuration, schema }) {

    // Defines destination directory for files in this loop
    const moduleRoot =  'src/modules/' + schema.identifier

    // Ensures existence of pages directory
    await this.ensureDir(moduleRoot + '/pages')

    // src/modules/resource/pages/list.vue
    await this.renderComponent({
      src: 'list_page.vue',
      dest: moduleRoot + '/pages/list.vue',
      data: { schema }
    })

    // src/modules/resource/pages/new/index.vue
    await this.renderComponent({
      src: 'new_page.vue',
      dest: moduleRoot + '/pages/new.vue',
      data: { schema }
    })

    // src/modules/resource/pages/edit.vue
    await this.renderComponent({
      src: 'edit_page.vue',
      dest: moduleRoot + '/pages/edit.vue',
      data: { schema }
    })

    // src/modules/resource/pages/show.vue
    await this.renderComponent({
      src: 'show_page.vue',
      dest: moduleRoot + '/pages/show.vue',
      data: { schema }
    })

  }
};
