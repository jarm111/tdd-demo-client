import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import User from '../types/User'
import Credentials from '../types/Credentials'
import userService from '../services/userService'
import Loading from '../types/Loading'

type State = {
  user: User | null
  loading: Loading
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

export const login = createAsyncThunk<
  User,
  Credentials,
  { rejectValue: Error }
>('user/login', async (credentials, thunkAPI) => {
  try {
    const data = await userService.login(credentials)
    return data
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message)
  }
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      userService.clearUser()
      toast(`Logged out!`)
      state.loading = 'idle'
      state.user = null
    },
    initUser: (state) => {
      const user = userService.getUser()
      if (user) {
        state.loading = 'success'
        state.user = user
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signup.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(signup.fulfilled, (state, { payload }) => {
      state.loading = 'success'
      state.user = payload
      toast(`Successfully created new account with ${payload.email}!`)
    })
    builder.addCase(signup.rejected, (state, { payload }) => {
      state.loading = 'failure'
      toast(payload, { type: 'error' })
    })

    builder.addCase(login.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.loading = 'success'
      state.user = payload
      toast(`Successfully logged in with ${payload.email}!`)
    })
    builder.addCase(login.rejected, (state, { payload }) => {
      state.loading = 'failure'
      toast(payload, { type: 'error' })
    })
  },
})

export const { logout, initUser } = userSlice.actions

export default userSlice.reducer
