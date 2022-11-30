const user = {
  namespaced: true,
  state: {
    info: { user: { test: 'Ones' } }
  },
  mutations: {
    setUser: (state, payload) => {
      state.info = payload
    }
  },
  actions: {
    login({ commit, state, rootState }, payload) {
      return {
        user: { test: 'aaa' }
      }
    }
  }
}

export default user
