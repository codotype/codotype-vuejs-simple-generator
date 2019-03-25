module.exports = {
  name: 'ModuleStore',
  async forEachSchema({ blueprint, configuration, schema }) {

    // Defines the newModel data
    let newModel = this.buildDefault({ schemas: blueprint.schemas, schema: schema })

    // Ensures presence of requisite directory module + store directory
    await this.ensureDir('src/modules/' + schema.identifier)
    await this.ensureDir('src/modules/' + schema.identifier + '/store')

    // src/store/resource/index.js
    await this.copyTemplate(
      this.templatePath('index.js'),
      this.destinationPath('src/modules/' + schema.identifier + '/store/index.js'),
      { schema }
    );

    // src/store/resource/constants.js
    // TODO - how can we get newModel to print as a JavaScript object, rather than stringified JSON?
    await this.copyTemplate(
      this.templatePath('constants.js'),
      this.destinationPath('src/modules/' + schema.identifier + '/store/constants.js'),
      { schema: schema, newModel: JSON.stringify(newModel, null, 2) }
    );

  }

};
