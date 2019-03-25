
module.exports = {
  name: 'VuexStore',
  async write({ blueprint }) {

    // src/store/index.js
    // TODO - move into separate generator class definition
    let storeModules = []
    blueprint.schemas.forEach((s) => {
      storeModules.push(s.identifier)
    })

    // TODO - this should be moved into base generator, methinks
    await this.copyTemplate(
      this.templatePath('index.js'),
      this.destinationPath('src/store/index.js'),
      { storeModules: storeModules.join(",\n    ") }
    );

  }
}
