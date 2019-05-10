module.exports = {
  name: 'VueBase',
  async write () {
    await this.copyDir({ src: '', dest: '' })

    await this.renderComponent({ src: 'package.json', dest: 'package.json' })
    await this.renderComponent({ src: 'LICENSE', dest: 'LICENSE' })
    await this.renderComponent({ src: 'README.md', dest: 'README.md' })
    await this.renderComponent({ src: 'public/index.html', dest: 'public/index.html' })
    await this.renderComponent({ src: 'src/App.vue', dest: 'src/App.vue' })
    await this.renderComponent({ src: 'src/modules/main/pages/home/index.vue', dest: 'src/modules/main/pages/home/index.vue' })
  }
}
