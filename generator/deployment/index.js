
module.exports = {
  name: 'Deployment',
  async write({ configuration }) {
    console.log('configuration.deployment.netlify')
    console.log('configuration.deployment.netlify')
    console.log(configuration.deployment.netlify)
    console.log(configuration.deployment.netlify)
    console.log(configuration.deployment.netlify)
    if (configuration.deployment.netlify) {
      await this.renderComponent({
        src: 'netlify.toml',
        dest: 'netlify.toml'
      });
    }
  }
}
