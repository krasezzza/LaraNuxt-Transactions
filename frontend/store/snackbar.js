export const state = () => ({
  popups: []
})

export const mutations = {
  SET_SNACKBAR (state, newSnackbar) {
    newSnackbar.visible = true
    state.popups = state.popups.concat(newSnackbar)
  },
  UNSET_SNACKBAR (state, oldSnackbar) {
    const snackbarIndexFound = state.popups.findIndex(
      snackbar => snackbar.id === oldSnackbar.id
    )
    if (snackbarIndexFound > -1) {
      state.popups.splice(snackbarIndexFound, 1)
    }
  }
}

export const actions = {
  showSnackbar ({ commit }, snackbar) {
    commit('SET_SNACKBAR', snackbar)
  },
  hideSnackbar ({ commit }, snackbar) {
    commit('UNSET_SNACKBAR', snackbar)
  }
}
