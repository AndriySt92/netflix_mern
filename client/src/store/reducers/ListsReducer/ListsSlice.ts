import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchLists, fetchMyList, fetchNewMovies } from './ActionsCreators'
import { IList } from '../../../models/IList'
import { IMovie } from '../../../models/IMovie'

interface ListsState {
  lists: Array<IList> | []
  isLoading: boolean
  error: string
  myList: Array<IMovie>
  newMoviesList: Array<IMovie>
}

const initialState: ListsState = {
  lists: [],
  isLoading: false,
  error: '',
  myList: [],
  newMoviesList: []
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
    [fetchMyList.fulfilled.type]: (state: ListsState, action: PayloadAction<IMovie>) => {
      state.isLoading = false
      state.error = ''
      state.myList = [...state.myList, action.payload]
    },
    [fetchMyList.pending.type]: (state: ListsState) => {
      state.isLoading = true
    },
    [fetchMyList.rejected.type]: (state: ListsState, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    [fetchNewMovies.fulfilled.type]: (state: ListsState, action: PayloadAction<Array<IMovie>>) => {
      state.isLoading = false
      state.error = ''
      state.newMoviesList = action.payload
    },
    [fetchNewMovies.pending.type]: (state: ListsState) => {
      state.isLoading = true
    },
    [fetchNewMovies.rejected.type]: (state: ListsState, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})
export default listsSlice.reducer
