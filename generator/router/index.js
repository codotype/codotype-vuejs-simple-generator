
module.exports = {
  name: 'ModuleRouter',
  async write({ blueprint, configuration }) {

    // Variables sent to the template
    let routeImports = []
    let routeModules = []

    function buildImport (s) {
      routeImports.push(`import ${ s.class_name }Routes from '@/modules/${ s.identifier }/router'`)
    }

    function buildModule (s) {
      routeModules.push(`...${ s.class_name }Routes`)
    }

    // Defaults
    const defaultModules = [
      { class_name: 'Main', identifier: 'main' },
    ]

    // TODO - these should all be opt-in
    defaultModules.forEach((m) => {
      buildImport(m)
      buildModule(m)
    })

    // src/store/index.js
    // TODO - abstract into separate generator class definition
    blueprint.schemas.forEach((s) => {
      buildImport(s)
      buildModule(s)
    })

    await this.renderComponent({
      src: 'router.js',
      dest: 'src/router.js',
      data: {
        routeImports: routeImports.join("\n"),
        routeModules: routeModules.join(",\n    ")
      }
    });
  },
  async forEachSchema({ schema, configuration }) {
    // src/modules/module/router.js
    await this.renderComponent({
      src: 'module-router.js',
      dest: 'src/modules/' + schema.identifier + '/router.js',
      data: { schema }
    })
  }
}
