import { IUser } from '../../../models/IUser'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchMovieStats, fetchMovies, updateMovie, fetchMovie, deleteMovie, createMovie } from './ActionsCreators'
import { IMovie } from '../../../models/IMovie'
import { IDataStats } from '../../../models/IDataStats'

interface MoviesState {
  movies: Array<IMovie> | null | undefined
  isLoading: boolean
  error: string
  isSuccess: boolean
  movie: IMovie | null
  movieStats: Array<IDataStats> | null
  isLoadingMovieStats: boolean
}

const initialState: MoviesState = {
  movies: null,
  isLoading: false,
  error: '',
  isSuccess: false,
  movie: null,
  movieStats: null,
  isLoadingMovieStats: false
}

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clear(state) {
      state.error = ''
      state.isSuccess = false
    },
    clearMovieStats(state) {
      state.movieStats = null
    }
  },
  extraReducers: {
    [fetchMovies.fulfilled.type]: (state: MoviesState, action: PayloadAction<Array<IMovie>>) => {
      state.isLoading = false
      state.error = ''
      state.movies = action.payload
    },
    [fetchMovies.pending.type]: (state: MoviesState) => {
      state.isLoading = false
    },
    [fetchMovies.rejected.type]: (state: MoviesState, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    [updateMovie.fulfilled.type]: (state: MoviesState, action: PayloadAction<IMovie>) => {
      state.movies = state.movies ? state.movies.map((item) => {
        if (item._id === action.payload._id) {
          return action.payload
        } else {
          return item
        }
      }) : null
      state.isSuccess = true
      state.movie = action.payload
      state.isLoading = false
    },
    [updateMovie.pending.type]: (state: MoviesState) => {
      state.isLoading = true
    },
    [updateMovie.rejected.type]: (state: MoviesState, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isSuccess = false
      state.isLoading = false
    },
    [fetchMovie.fulfilled.type]: (state: MoviesState, action: PayloadAction<IMovie>) => {
      state.movie = action.payload
      state.isLoading = false
    },
    [fetchMovie.pending.type]: (state: MoviesState) => {
      state.isLoading = true
    },
    [fetchMovie.rejected.type]: (state: MoviesState, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    },
    [deleteMovie.fulfilled.type]: (state: MoviesState, action: PayloadAction<string>) => {
      state.movies = state.movies?.filter(movie => movie._id !== action.payload)
    },
    [deleteMovie.rejected.type]: (state: MoviesState, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    [createMovie.fulfilled.type]: (state: MoviesState, action: PayloadAction<IMovie>) => {
      state.movies?.push(action.payload)
      state.isSuccess = true
      state.isLoading = false
    },
    [createMovie.pending.type]: (state: MoviesState) => {
      state.isLoading = true
    },
    [createMovie.rejected.type]: (state: MoviesState, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    },
    [fetchMovieStats.fulfilled.type]: (state: MoviesState, action: PayloadAction<Array<IDataStats>>) => {
      state.movieStats = action.payload
      state.isLoadingMovieStats = false
    },
    [fetchMovieStats.pending.type]: (state: MoviesState) => {
      state.isLoadingMovieStats = true
    },
    [fetchMovieStats.rejected.type]: (state: MoviesState, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoadingMovieStats = false
    },
  },
})

export const { clear, clearMovieStats } = moviesSlice.actions
export default moviesSlice.reducer
