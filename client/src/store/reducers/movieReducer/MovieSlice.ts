import { IMovie } from '../../../models/IMovie'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchMovie, searchMovie } from './ActionsCreators'

interface MovieState {
  movie: IMovie | null
  isLoading: boolean
  error: string
  isSearching: boolean
  searchError: string
  searchedMovie: IMovie | null 
  offerContent: null | Array<IMovie>
}

const initialState: MovieState = {
  movie: null,
  isLoading: false,
  error: '',
  isSearching: false,
  searchedMovie: null,
  searchError: '',
  offerContent: null
}

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    closeSearchMovie(state) {
      state.searchedMovie =null
      state.offerContent =null
    }
  },
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
    [searchMovie.fulfilled.type]: (state: MovieState, action: PayloadAction<{data: IMovie,offerContent: Array<IMovie>}>) => {
      state.isSearching = false
      state.searchError = ''
      state.searchedMovie = action.payload.data
      state.offerContent = action.payload.offerContent
    },
    [searchMovie.pending.type]: (state: MovieState) => {
        state.isSearching = true
    },
    [searchMovie.rejected.type]: (state: MovieState, action: PayloadAction<string>) => {
        state.isSearching = false
        state.searchError = action.payload
    },
  },
})
export const { closeSearchMovie } = movieSlice.actions
export default movieSlice.reducer
