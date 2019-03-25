module.exports = {
  name: 'VueBase',
  async write () {

    await this.copyDir(
      this.templatePath(),
      this.destinationPath()
    )

    await this.renderComponent({ src: 'package.json', dest: 'package.json' })
    await this.renderComponent({ src: 'LICENSE', dest: 'LICENSE' })
    await this.renderComponent({ src: 'public/index.html', dest: 'public/index.html' })
    await this.renderComponent({ src: 'src/App.vue', dest: 'src/App.vue' })
    await this.renderComponent({ src: 'src/modules/home/pages/home/index.vue', dest: 'src/modules/home/pages/home/index.vue' })
  }
}
