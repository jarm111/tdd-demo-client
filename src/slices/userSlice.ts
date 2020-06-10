import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import User from '../types/User'
import userService, { Credentials } from '../services/userService'

type State = User | null

export const signup = createAsyncThunk(
  'user/signup',
  async (credentials: Credentials) => {
    const data = await userService.signup(credentials)
    return data
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: null as State,
  reducers: {
    logout: () => {
      userService.clearUser()
      return null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signup.fulfilled, (_, { payload }) => {
      return payload
    })
  },
})

export const { logout } = userSlice.actions

export default userSlice.reducer
