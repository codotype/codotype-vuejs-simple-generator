
module.exports = {
  name: 'ModuleStore',
  async forEachSchema({ blueprint, configuration, schema }) {

    // Defines the newModel data
    let newModel = this.buildDefault({ schemas: blueprint.schemas, schema: schema })

    // Ensures presence of requisite directory module + store directory
    await this.ensureDir('src/modules/' + schema.identifier)
    // await this.ensureDir('src/modules/' + schema.identifier + '/store')

    // src/store/resource/index.js
    // await this.copyTemplate(
    //   this.templatePath('index.js'),
    //   this.destinationPath('src/modules/' + schema.identifier + '/store/index.js'),
    //   { schema }
    // );

    // src/store/resource/constants.js
    // TODO - how can we get newModel to print as a JavaScript object, rather than stringified JSON?
    // await this.copyTemplate(
    //   this.templatePath('constants.js'),
    //   this.destinationPath('src/modules/' + schema.identifier + '/store/constants.js'),
    //   { schema: schema, newModel: JSON.stringify(newModel, null, 2) }
    // );

    // for (var i = schema.relations.length - 1; i >= 0; i--) {
    //   let rel = schema.relations[i]
    //   // src/store/resource/actions.js

    //   let pluralization
    //   if (['BELONGS_TO', 'HAS_ONE'].includes(rel.type)) {
    //     pluralization = rel.alias.class_name
    //   } else {
    //     pluralization =  rel.alias.class_name_plural
    //   }

    //   await this.copyTemplate(
    //     this.templatePath('relationModule.js'),
    //     this.destinationPath('src/modules/' + schema.identifier + '/store/related' + pluralization + 'Module.js'),
    //     { schema, rel }
    //   );

    // }

  }

};
