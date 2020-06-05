import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import User from '../types/User'

type State = User | null

const userSlice = createSlice({
  name: 'user',
  initialState: null as State,
  reducers: {
    setUser: (_, action: PayloadAction<User>) => action.payload,
    clearUser: (_) => null,
  },
})

export const { setUser, clearUser } = userSlice.actions

export default userSlice.reducer
