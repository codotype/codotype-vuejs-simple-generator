module.exports = {
  name: 'VueAuth',
  async write ({ blueprint }) {

    await this.copyDir(
      this.templatePath(),
      this.destinationPath('src/modules/auth')
    )

    const userSchema = blueprint.schemas.find(s => s.identifier === 'user')

    await this.renderComponent({
      src: 'pages/register/index.vue',
      dest: 'src/modules/auth/pages/register/index.vue',
      options: { userSchema }
    })

    // TODO - make inlineDeconstruction a helper function
    const inlineDeconstruction = userSchema.attributes.map(r => r.identifier).join(', ')

    await this.renderComponent({
      src: 'store/index.js',
      dest: 'src/modules/auth/store/index.js',
      options: { inlineDeconstruction }
    })

    await this.renderComponent({
      src: 'store/loginModule.js',
      dest: 'src/modules/auth/store/loginModule.js',
      options: { inlineDeconstruction }
    })

    await this.renderComponent({
      src: 'store/registerModule.js',
      dest: 'src/modules/auth/store/registerModule.js',
      options: { inlineDeconstruction }
    })

    // await this.renderComponent({
    //   src: 'store/resetPasswordModule.js',
    //   dest: 'src/modules/auth/store/resetPasswordModule.js',
    //   options: { inlineDeconstruction }
    // })

  }
}
