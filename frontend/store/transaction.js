export const state = () => ({
  loading: false,
  renderKeyOne: 0,
  renderKeyList: 0
})

export const mutations = {
  SET_LOADING (state, isLoading) {
    state.loading = !!isLoading
  },
  SET_RENDER_KEY_ONE (state) {
    state.renderKeyOne++
  },
  SET_RENDER_KEY_LIST (state) {
    state.renderKeyList++
  }
}

export const actions = {
  updateLoadingStatus ({ commit }, payload) {
    commit('SET_LOADING', payload)
  },
  updateRenderKeyOne ({ commit }) {
    commit('SET_RENDER_KEY_ONE')
  },
  updateRenderKeyList ({ commit }) {
    commit('SET_RENDER_KEY_LIST')
  }
}

export const getters = {}
