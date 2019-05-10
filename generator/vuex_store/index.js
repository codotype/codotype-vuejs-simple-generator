
module.exports = {
  name: 'VuexStore',
  async write({ blueprint }) {

    // src/store/index.js
    let storeModules = []
    blueprint.schemas.forEach((s) => {
      storeModules.push(s.identifier)
    })

    // TODO - this should be moved into base generator, methinks
    await this.renderComponent({
      src: 'index.js',
      dest: 'src/store/index.js',
      data: { storeModules: storeModules.join(",\n    ") }
    });

  }
}
