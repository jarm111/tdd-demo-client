import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Loading = 'idle' | 'pending' | 'success' | 'failure'

const initLoadingReducer = (name: string) => {
  const loadingSlice = createSlice({
    name: `loading/${name}`,
    initialState: 'idle' as Loading,
    reducers: {
      setLoading: (_, action: PayloadAction<Loading>) => action.payload,
    },
  })

  return [loadingSlice.reducer, loadingSlice.actions.setLoading] as [
    typeof loadingSlice.reducer,
    typeof loadingSlice.actions.setLoading
  ]
}

export default initLoadingReducer
