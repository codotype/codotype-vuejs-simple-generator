
module.exports = {
  name: 'ModulePages',
  async forEachSchema({ blueprint, configuration, schema }) {

    // Defines destination directory for files in this loop
    const moduleRoot =  'src/modules/' + schema.identifier

    // Ensures existence of pages directory
    await this.ensureDir(moduleRoot + '/pages')

    // src/modules/resource/pages/list.vue
    await this.copyTemplate(
      this.templatePath('list_page.vue'),
      this.destinationPath(moduleRoot + '/pages/list.vue'),
      { schema }
    )

    // src/modules/resource/pages/new/index.vue
    await this.copyTemplate(
      this.templatePath('new_page.vue'),
      this.destinationPath(moduleRoot + '/pages/new.vue'),
      { schema }
    )

    // src/modules/resource/pages/edit.vue
    await this.copyTemplate(
      this.templatePath('edit_page.vue'),
      this.destinationPath(moduleRoot + '/pages/edit.vue'),
      { schema }
    )

    // src/modules/resource/pages/show.vue
    await this.copyTemplate(
      this.templatePath('show_page.vue'),
      this.destinationPath(moduleRoot + '/pages/show.vue'),
      { schema }
    )

  }
};
