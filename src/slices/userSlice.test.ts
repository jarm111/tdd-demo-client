import { configureStore } from '@reduxjs/toolkit'
import axios from 'axios'
import userReducer, { signup, logout, login } from './userSlice'
import { user, credentials } from '../mocks/userMockData'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const setup = () =>
  configureStore({
    reducer: {
      user: userReducer,
    },
  })

test('initial state', () => {
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
    loading: 'success',
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

  Promise.allSettled([
    store.dispatch(signup(credentials)),
    expect(store.getState().user).toEqual(endState),
  ])
})

test('failed sign up', async () => {
  const store = setup()

  const endState = {
    user: null,
    loading: 'failure',
  }

  mockedAxios.post.mockRejectedValue(Error('Oops, something went wrong'))

  await store.dispatch(signup(credentials))

  expect(store.getState().user).toEqual(endState)
})

test('logs in user', async () => {
  const store = setup()

  const response = {
    data: user,
  }

  const endState = {
    user,
    loading: 'success',
  }

  mockedAxios.post.mockResolvedValue(response)

  await store.dispatch(login(credentials))

  expect(store.getState().user).toEqual(endState)
})

test('failed log in', async () => {
  const store = setup()

  const endState = {
    user: null,
    loading: 'failure',
  }

  mockedAxios.post.mockRejectedValue(Error('Oops, something went wrong'))

  await store.dispatch(login(credentials))

  expect(store.getState().user).toEqual(endState)
})

test('pending log in', async () => {
  const store = setup()

  const response = {
    data: user,
  }

  const endState = {
    user: null,
    loading: 'pending',
  }

  mockedAxios.post.mockResolvedValue(response)

  Promise.allSettled([
    store.dispatch(login(credentials)),
    expect(store.getState().user).toEqual(endState),
  ])
})
