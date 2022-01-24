import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchLists } from './ActionsCreators'
import { IList } from '../../../models/IList'

interface ListsState {
  lists: Array<IList> | []
  isLoading: boolean
  error: string
}

const initialState: ListsState = {
  lists: [],
  isLoading: false,
  error: '',
}

export const listsSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchLists.fulfilled.type]: (state: ListsState, action: PayloadAction<Array<IList>>) => {
      state.isLoading = false
      state.error = ''
      state.lists = action.payload
    },
    [fetchLists.pending.type]: (state: ListsState) => {
      state.isLoading = true
    },
    [fetchLists.rejected.type]: (state: ListsState, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})
export default listsSlice.reducer
