import { IMovie } from '../../../models/IMovie'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchMovie } from './ActionsCreators'

interface MovieState {
  movie: IMovie | null
  isLoading: boolean
  error: string
}

const initialState: MovieState = {
  movie: null,
  isLoading: false,
  error: '',
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
  },
})
export default movieSlice.reducer
