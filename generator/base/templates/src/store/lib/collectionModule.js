// Exports a collection build around a basic model prototype
export default function ({ NEW_MODEL }) {

  return Object.assign({}, {
    namespaced: true,
    state: {
      defaultNewModel: Object.assign({}, NEW_MODEL),
      newModel: Object.assign({}, NEW_MODEL),
      editModel: Object.assign({}, NEW_MODEL),
      items: []
    },
    mutations: {
      items (state, items) {
        state.items = items
      },
      resetNewModel (state) {
        state.newModel = Object.assign({}, state.defaultNewModel)
      },
      resetEditModel (state) {
        state.editModel = state.defaultNewModel
      },
      newModel (state, model) {
        state.newModel = Object.assign({}, model)
      },
      editModel (state, model) {
        state.editModel = Object.assign({}, model)
      }
    },
    getters: {
      items (state) {
        return state.items
      },
      newModel (state) {
        return Object.assign({}, state.newModel)
      },
      editModel (state) {
        return Object.assign({}, state.editModel)
      }
    },
    actions: {
      create ({ state, commit }) {
        // Sets up createdModel
        const createdModel = Object.assign({}, state.newModel);
        createdModel.id = 'ID-' + Math.random().toString()

        // Resets state.newModel()
        commit('resetNewModel')

        // Updates state.items
        commit('items', [...state.items, createdModel])
      },
      update ({ state, commit }) {
        // Updates items
        const items = state.items.map((model) => {
          if (model.id !== state.editModel.id) return model
          return state.editModel
        })
        commit('items', items)

        // Resets state.editModel
        commit('resetEditModel')
      },
      destroy ({ state, commit }, modelId) {
        const items = state.items.filter(m => m.id !== modelId)
        commit('items', items)
      }
    }

  })

}
