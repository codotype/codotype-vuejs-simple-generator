
module.exports = {
  name: 'Deployment',
  async write({ configuration }) {
    if (!configuration.deployment.netlify) {
      await this.renderComponent({
        src: 'netlify.toml',
        dest: 'netlify.toml'
      });
    }
  }
}
