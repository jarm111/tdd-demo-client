import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import User from '../types/User'
import userService, { Credentials } from '../services/userService'

type State = User | null
type Error = {
  message: string
}

export const signup = createAsyncThunk<
  User,
  Credentials,
  { rejectValue: Error }
>('user/signup', async (credentials, thunkAPI) => {
  try {
    const data = await userService.signup(credentials)
    return data
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message)
  }
})

const userSlice = createSlice({
  name: 'user',
  initialState: null as State,
  reducers: {
    logout: () => {
      userService.clearUser()
      toast(`Logged out!`)
      return null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signup.fulfilled, (_, { payload }) => {
      toast(`Successfully created new account with ${payload.email}!`)
      return payload
    })
    builder.addCase(signup.rejected, (_, { payload }) => {
      toast(payload, { type: 'error' })
      return null
    })
  },
})

export const { logout } = userSlice.actions

export default userSlice.reducer
