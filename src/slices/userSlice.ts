import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import User from '../types/User'
import Credentials from '../types/Credentials'
import userService from '../services/userService'

type State = {
  user: User | null
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

type Error = {
  message: string
}

const initialState: State = {
  user: null,
  loading: 'idle',
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
  initialState,
  reducers: {
    logout: (_) => {
      userService.clearUser()
      toast(`Logged out!`)
      return { loading: 'idle', user: null }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signup.fulfilled, (_, { payload }) => {
      toast(`Successfully created new account with ${payload.email}!`)
      return {
        user: payload,
        loading: 'succeeded',
      }
    })
    builder.addCase(signup.rejected, (_, { payload }) => {
      toast(payload, { type: 'error' })
      return {
        user: null,
        loading: 'failed',
      }
    })
    builder.addCase(signup.pending, () => {
      return {
        user: null,
        loading: 'pending',
      }
    })
  },
})

export const { logout } = userSlice.actions

export default userSlice.reducer
