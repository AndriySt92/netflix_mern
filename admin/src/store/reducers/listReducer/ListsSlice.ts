import { IUser } from '../../../models/IUser'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addMovie, fetchLists, updateList, fetchList, deleteList, createList, fetchMovie } from './ActionsCreators'
import { IMovie } from '../../../models/IMovie'
import { IList } from '../../../models/IList'

interface ListsState {
  lists: Array<IList> | null | undefined
  isLoading: boolean
  error: string
  isSuccess: boolean
  list: IList | null
  listMovies: [] | Array<IMovie>
}

const initialState: ListsState = {
  lists: null,
  isLoading: false,
  error: '',
  isSuccess: false,
  list: null,
  listMovies: []
}

export const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    clear(state) {
      state.error = ''
      state.isSuccess = false
    },
  },
  extraReducers: {
    [fetchLists.fulfilled.type]: (state: ListsState, action: PayloadAction<Array<IList>>) => {
      state.isLoading = false
      state.error = ''
      state.lists = action.payload
    },
    [fetchLists.pending.type]: (state: ListsState) => {
      state.isLoading = false
    },
    [fetchLists.rejected.type]: (state: ListsState, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    [fetchList.fulfilled.type]: (state: ListsState, action: PayloadAction<IList>) => {
      state.list = action.payload
      state.isLoading = false
    },
    [fetchList.pending.type]: (state: ListsState) => {
      state.isLoading = true
    },
    [fetchList.rejected.type]: (state: ListsState, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    },
    [updateList.fulfilled.type]: (state: ListsState, action: PayloadAction<IList>) => {
      state.lists = state.lists ? state.lists.map((item) => {
        if (item._id === action.payload._id) {
          return action.payload
        } else {
          return item
        }
      }) : null
      state.isSuccess = true
      state.list = action.payload
      state.isLoading = false
    },
    [updateList.pending.type]: (state: ListsState) => {
      state.isLoading = true
    },
    [updateList.rejected.type]: (state: ListsState, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isSuccess = false
      state.isLoading = false
    },
    [deleteList.fulfilled.type]: (state: ListsState, action: PayloadAction<string>) => {
      state.lists = state.lists?.filter(list => list._id !== action.payload)
    },
    [deleteList.rejected.type]: (state: ListsState, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    [createList.fulfilled.type]: (state: ListsState, action: PayloadAction<IList>) => {
      state.lists?.push(action.payload)
      state.isSuccess = true
      state.isLoading = false
    },
    [createList.pending.type]: (state: ListsState) => {
      state.isLoading = true
    },
    [createList.rejected.type]: (state: ListsState, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    },
    [fetchMovie.fulfilled.type]: (state: ListsState, action: PayloadAction<IMovie>) => {
      state.listMovies = [...state.listMovies, action.payload]
      state.isSuccess = true
      state.isLoading = false
    },
    [fetchMovie.pending.type]: (state: ListsState) => {
      state.isLoading = true
    },
    [fetchMovie.rejected.type]: (state: ListsState, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    },
    [addMovie.fulfilled.type]: (state: ListsState, action: PayloadAction<string>) => {
      state.list?.content.push(action.payload)
    },
    [addMovie.rejected.type]: (state: ListsState, action: PayloadAction<string>) => {
      state.error = action.payload
    },
  },
})

export const { clear } = listsSlice.actions
export default listsSlice.reducer
