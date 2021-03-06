import axios from 'axios'
import Credentials from '../types/Credentials'
import User from '../types/User'
import formatResponseError from '../utils/formatResponseError'

const signupUrl = '/api/signup'
const loginUrl = '/api/login'
const localStorageKey = 'Login'

const setUser = (data: User) => {
  window.localStorage.setItem(localStorageKey, JSON.stringify(data))
}

const userService = {
  signup: async (credentials: Credentials) => {
    try {
      const { data } = await axios.post(signupUrl, credentials)
      setUser(data)
      return data
    } catch (e) {
      throw new Error(formatResponseError(e))
    }
  },
  login: async (credentials: Credentials) => {
    try {
      const { data } = await axios.post(loginUrl, credentials)
      setUser(data)
      return data
    } catch (e) {
      throw new Error(formatResponseError(e))
    }
  },
  clearUser: () => {
    window.localStorage.removeItem(localStorageKey)
  },
  getUser: (): User | null => {
    const user = window.localStorage.getItem('Login')
    if (user) {
      return JSON.parse(user)
    }
    return null
  },
}

export default userService
