module.exports = {
  name: 'ModuleStore',
  async forEachSchema({ blueprint, configuration, schema }) {

    // Defines the newModel data
    let newModel = this.buildDefault({ schemas: blueprint.schemas, schema: schema })

    // Ensures presence of requisite directory module + store directory
    await this.ensureDir('src/modules/' + schema.identifier)

    // src/store/resource/index.js
    await this.renderComponent({
      src: 'index.js',
      dest: 'src/modules/' + schema.identifier + '/store.js',
      data: { schema: schema, newModel: JSON.stringify(newModel, null, 2) }
    });
  }
};
