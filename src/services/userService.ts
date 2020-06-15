import axios from 'axios'

const signupUrl = '/api/signup'
const localStorageKey = 'Login'

export type Credentials = {
  email: string
  password: string
}

const userService = {
  signup: async (credentials: Credentials) => {
    try {
      const { data } = await axios.post(signupUrl, credentials)
      window.localStorage.setItem(localStorageKey, JSON.stringify(data))
      return data
    } catch (e) {
      const {
        status,
        statusText,
        data: { error },
      } = e.response
      throw new Error(`Status: ${status} ${statusText}, ${error}`)
    }
  },
  clearUser: () => {
    window.localStorage.removeItem(localStorageKey)
  },
}

export default userService
