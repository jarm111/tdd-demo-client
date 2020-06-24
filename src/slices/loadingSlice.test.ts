import { configureStore } from '@reduxjs/toolkit'
import initLoadingReducer from './loadingSlice'

const [oneReducer, setLoadingOne] = initLoadingReducer('one')
const [twoReducer, setLoadingTwo] = initLoadingReducer('two')

const setup = () =>
  configureStore({
    reducer: {
      loadingOne: oneReducer,
      loadingTwo: twoReducer,
    },
  })

test('returns correct initial state', () => {
  const store = setup()
  const initialState = {
    loadingOne: 'idle',
    loadingTwo: 'idle',
  }

  expect(store.getState()).toEqual(initialState)
})

test('set loading', () => {
  const oneState = 'pending'
  const twoState = 'success'
  const store = setup()
  const endState = {
    loadingOne: oneState,
    loadingTwo: twoState,
  }

  store.dispatch(setLoadingOne(oneState))
  store.dispatch(setLoadingTwo(twoState))

  expect(store.getState()).toEqual(endState)
})
