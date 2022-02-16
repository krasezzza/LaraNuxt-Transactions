export default ({ $axios }, inject) => {
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  }
  const gateway = 'http://localhost:8080'

  inject('api', {
    oneTransaction,
    allTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction
  })

  async function oneTransaction (transactionId) {
    const uri = `api/transactions/${transactionId}`

    return await $axios.get(
      `${gateway}/${uri}`,
      axiosConfig
    )
  }

  async function allTransactions () {
    const uri = 'api/transactions'

    return await $axios.get(
      `${gateway}/${uri}`,
      axiosConfig
    )
  }

  async function createTransaction (payload) {
    const uri = 'api/transactions'

    return await $axios.post(
      `${gateway}/${uri}`,
      payload,
      axiosConfig
    )
  }

  async function updateTransaction (transactionId, payload) {
    const uri = `api/transactions/${transactionId}`

    return await $axios.patch(
      `${gateway}/${uri}`,
      payload,
      axiosConfig
    )
  }

  async function deleteTransaction (transactionId) {
    const uri = `api/transactions/${transactionId}`

    return await $axios.delete(
      `${gateway}/${uri}`,
      axiosConfig
    )
  }
}
