const duration = 3500
const position = 'top-right'
const theme = 'toasted-primary'

export default {
  namespaced: true,
  actions: {
    success ({}, { message }) {
      this._vm.$toasted.show(message, {
         theme,
         position,
         duration,
         className: 'bg-success'
      });
    },
    error ({}, { message }) {
      this._vm.$toasted.show('Error! ' + message, {
         theme,
         position,
         duration,
         className: 'bg-danger'
      });
    }
  }
}
