import { configureStore } from '@reduxjs/toolkit'
import userReducer, { setUser, clearUser } from './userSlice'
import User from '../types/User'

const setup = () =>
  configureStore({
    reducer: {
      user: userReducer,
    },
  })

test('returns null as initial state', () => {
  const store = setup()

  expect(store.getState().user).toBeNull()
})

test('sets user and clears', () => {
  const store = setup()
  const user: User = {
    id: 'id123',
    email: 'test.user@email.com',
    token: 'token123',
  }

  store.dispatch(setUser(user))

  expect(store.getState().user).toEqual(user)

  store.dispatch(clearUser())

  expect(store.getState().user).toBeNull()
})
