module.exports = {
  name: 'VueJS Client',
  async write () {
    await this.composeWith('./base')
    await this.composeWith('./vuex_store')
    await this.composeWith('./navbar')
    await this.composeWith('./vue_store')
    await this.composeWith('./router')
    await this.composeWith('./pages')
    await this.composeWith('./components')
  }
}
