
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

    await this.copyTemplate(
      this.templatePath('router.js'),
      this.destinationPath('src/routers/index.js'),
      {
        routeImports: routeImports.join("\n"),
        routeModules: routeModules.join(",\n    ")
      }
    );

    // Iterates over each schema in the this.options.build.blueprint.schemas array
    // TODO - encapsulate this in a call for forEachSchema
    for (var i = blueprint.schemas.length - 1; i >= 0; i--) {
      const schema = blueprint.schemas[i]

      // Isolates API Actions metadata
      // src/routers/resource.js
      await this.copyTemplate(
        this.templatePath('module-router.js'),
        this.destinationPath('src/modules/' + schema.identifier + '/router.js'),
        { schema }
      )

    }
    // console.log('WROTE MODULE STORE')
  }
}
