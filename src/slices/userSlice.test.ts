import { configureStore } from '@reduxjs/toolkit'
import axios from 'axios'
import userReducer, { signup } from './userSlice'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

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

test('signs up user', async () => {
  const store = setup()
  const credentials = {
    email: 'test.user@email.com',
    password: 'password1234',
  }
  const user = {
    token: 'token123',
    email: credentials.email,
    id: 'user123',
  }
  const response = {
    data: user,
  }

  mockedAxios.post.mockResolvedValue(response)

  await store.dispatch(signup(credentials))

  expect(store.getState().user).toEqual(user)
})
