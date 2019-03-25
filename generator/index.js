module.exports = {
  name: 'VueJS Client',
  async write () {
    await this.composeWith('./vue_base')
    await this.composeWith('./vue_auth')
    await this.composeWith('./vuex_store')
    await this.composeWith('./vue_navbar')
    // await this.composeWith('./vue_store')
    await this.composeWith('./vue_router')
    await this.composeWith('./vue_pages')
    await this.composeWith('./vue_components')
  }
}
