module.exports = {
  name: 'ModuleStore',
  async forEachSchema({ blueprint, configuration, schema }) {

    // Defines the newModel data
    let newModel = this.buildDefault({ schemas: blueprint.schemas, schema: schema })

    // Ensures presence of requisite directory module + store directory
    await this.ensureDir('src/modules/' + schema.identifier)
    await this.ensureDir('src/modules/' + schema.identifier + '/store')

    // src/store/resource/index.js
    await this.renderComponent({
      src: 'index.js',
      dest: 'src/modules/' + schema.identifier + '/store/index.js',
      data: { schema }
    });

    // src/store/resource/constants.js
    // TODO - how can we get newModel to print as a JavaScript object, rather than stringified JSON?
    await this.renderComponent({
      src: 'constants.js',
      dest: 'src/modules/' + schema.identifier + '/store/constants.js',
      data: { schema: schema, newModel: JSON.stringify(newModel, null, 2) }
    });

  }

};
