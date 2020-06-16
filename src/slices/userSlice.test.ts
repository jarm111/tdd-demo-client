import { configureStore } from '@reduxjs/toolkit'
import axios from 'axios'
import userReducer, { signup, logout } from './userSlice'
import { user, credentials } from '../mocks/userMockData'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const setup = () =>
  configureStore({
    reducer: {
      user: userReducer,
    },
  })

test('returns correct initial state', () => {
  const store = setup()

  const correctInitialState = {
    user: null,
    loading: 'idle',
  }

  expect(store.getState().user).toEqual(correctInitialState)
})

test('signs up user', async () => {
  const store = setup()

  const response = {
    data: user,
  }

  const endState = {
    user,
    loading: 'succeeded',
  }

  mockedAxios.post.mockResolvedValue(response)

  await store.dispatch(signup(credentials))

  expect(store.getState().user).toEqual(endState)
})

test('logs out user', async () => {
  const store = setup()

  const response = {
    data: user,
  }

  const endState = {
    user: null,
    loading: 'idle',
  }

  mockedAxios.post.mockResolvedValue(response)

  await store.dispatch(signup(credentials))

  store.dispatch(logout())

  expect(store.getState().user).toEqual(endState)
})

test('pending sign up', async () => {
  const store = setup()

  const response = {
    data: user,
  }

  const endState = {
    user: null,
    loading: 'pending',
  }

  mockedAxios.post.mockResolvedValue(response)

  store.dispatch(signup(credentials))

  expect(store.getState().user).toEqual(endState)
})

test('failed sign up', async () => {
  const store = setup()

  const endState = {
    user: null,
    loading: 'failed',
  }

  mockedAxios.post.mockRejectedValue(Error('Oops, something went wrong'))

  await store.dispatch(signup(credentials))

  expect(store.getState().user).toEqual(endState)
})
