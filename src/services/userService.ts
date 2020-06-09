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
      console.error(e)
    }
  },
}

export default userService
