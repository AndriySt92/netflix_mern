import { IMovie } from '../../../models/IMovie'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchMovie, searchMovie } from './ActionsCreators'

interface MovieState {
  movie: IMovie | null
  isLoading: boolean
  error: string
  isSearching: boolean
  searchedMovie: IMovie | null | string
}

const initialState: MovieState = {
  movie: null,
  isLoading: false,
  error: '',
  isSearching: false,
  searchedMovie: null
}

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchMovie.fulfilled.type]: (state: MovieState, action: PayloadAction<IMovie>) => {
      state.isLoading = false
      state.error = ''
      state.movie = action.payload
    },
    [fetchMovie.pending.type]: (state: MovieState) => {
        state.isLoading = true
    },
    [fetchMovie.rejected.type]: (state: MovieState, action: PayloadAction<string>) => {
        state.isLoading = false
        state.error = action.payload
    },
    [searchMovie.fulfilled.type]: (state: MovieState, action: PayloadAction<IMovie | string>) => {
      state.isSearching = false
      state.error = ''
      state.searchedMovie = action.payload
    },
    [searchMovie.pending.type]: (state: MovieState) => {
        state.isSearching = true
    },
    [searchMovie.rejected.type]: (state: MovieState, action: PayloadAction<string>) => {
        state.isSearching = false
        state.error = action.payload
    },
  },
})
export default movieSlice.reducer
