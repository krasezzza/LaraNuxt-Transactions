import { v4 as uuidv4 } from 'uuid'

export default ({ store }, inject) => {
  inject('toast', {
    async success (message = 'Completed successfully.') {
      await store.dispatch('snackbar/showSnackbar', {
        id: uuidv4(),
        type: 'success',
        text: message,
        timeout: 3500
      })
    },
    async error (message = 'Error occurred!') {
      await store.dispatch('snackbar/showSnackbar', {
        id: uuidv4(),
        type: 'error',
        text: message,
        timeout: 4500
      })
    }
  })
}
