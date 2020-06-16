import axios from 'axios'
import Credentials from '../types/Credentials'

const signupUrl = '/api/signup'
const localStorageKey = 'Login'

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
