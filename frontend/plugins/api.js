export default ({ $axios, $config }, inject) => {
  const axiosConfig = {
    headers: {
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    }
  }
  const gateway = $config.API_URL

  inject('api', {
    userRegister,
    oneTransaction,
    allTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction
  })

  async function userRegister (payload) {
    const uri = 'register'

    return await $axios.post(
      `${gateway}/${uri}`,
      payload,
      axiosConfig
    )
  }

  async function oneTransaction (transactionId, token) {
    const uri = `api/transactions/${transactionId}`

    axiosConfig.headers.Authorization = `Bearer ${token}`

    return await $axios.get(
      `${gateway}/${uri}`,
      axiosConfig
    )
  }

  async function allTransactions (token) {
    const uri = 'api/transactions'

    axiosConfig.headers.Authorization = `Bearer ${token}`

    return await $axios.get(
      `${gateway}/${uri}`,
      axiosConfig
    )
  }

  async function createTransaction (payload, token) {
    const uri = 'api/transactions'

    axiosConfig.headers.Authorization = `Bearer ${token}`

    return await $axios.post(
      `${gateway}/${uri}`,
      payload,
      axiosConfig
    )
  }

  async function updateTransaction (transactionId, payload, token) {
    const uri = `api/transactions/${transactionId}`

    axiosConfig.headers.Authorization = `Bearer ${token}`

    return await $axios.patch(
      `${gateway}/${uri}`,
      payload,
      axiosConfig
    )
  }

  async function deleteTransaction (transactionId, token) {
    const uri = `api/transactions/${transactionId}`

    axiosConfig.headers.Authorization = `Bearer ${token}`

    return await $axios.delete(
      `${gateway}/${uri}`,
      axiosConfig
    )
  }
}
