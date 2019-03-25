
module.exports = {
  name: 'Navbar',
  async write ({ blueprint }) {

    // Generates the header links for each model/schema
    const headerLinks = blueprint.schemas.map((s) => {
      return {
        text: s.label_plural,
        href: '/' + s.identifier_plural
      }
    })

    await this.copyTemplate(
      this.templatePath('Navbar.vue'),
      this.destinationPath('src/components/Navbar.vue'),
      { headerLinks: headerLinks }
    );
  }
}