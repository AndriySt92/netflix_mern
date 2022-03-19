import { IUser } from '../../../models/IUser'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { login, register, addMovieToMyList, deleteMovieFromMyList } from './ActionsCreators'

interface AuthState {
  user: IUser | null | undefined
  isLoading: boolean
  error: string
  isSuccess: boolean
  isUpdating: boolean
  updateError: string
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: '',
  isSuccess: false,
  isUpdating: false,
  updateError: ''
}

const setIsLoading = (state: AuthState) => {
  state.isLoading = true
}

const setError = (state: AuthState, action: PayloadAction<string>) => {
  state.isLoading = false
  state.error = action.payload
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload
    },
    logout(state) {
      state.user = null
    },
    setIsSuccess(state, action: PayloadAction<boolean>) {
      state.isSuccess = action.payload
    },
    clearError(state) {
      state.error = ''
    },
  },
  extraReducers: {
    [login.fulfilled.type]: (state: AuthState, action: PayloadAction<IUser>) => {
      state.isLoading = false
      state.error = ''
      state.user = action.payload
    },
    [login.pending.type]: setIsLoading,
    [login.rejected.type]: setError,
    [register.fulfilled.type]: (state: AuthState) => {
      state.isLoading = false
      state.error = ''
      state.isSuccess = true
    },
    [register.pending.type]: setIsLoading,
    [register.rejected.type]: setError,
    [addMovieToMyList.fulfilled.type]: (
      state: AuthState,
      action: PayloadAction<IUser>,
    ) => {
      state.isUpdating = false
      state.updateError = ''
      state.user = action.payload
 
    },
    [addMovieToMyList.pending.type]: (state: AuthState) => {
      state.isUpdating = true
    },
    [addMovieToMyList.rejected.type]: (state: AuthState, action: PayloadAction<string>) => {
      state.isUpdating = false
      state.updateError = action.payload
    },
    [deleteMovieFromMyList.fulfilled.type]: (
      state: AuthState,
      action: PayloadAction<IUser>,
    ) => {
      state.isUpdating = false
      state.updateError = ''
      state.user = action.payload
    },
    [deleteMovieFromMyList.pending.type]: (state: AuthState) => {
      state.isUpdating = true
    },
    [deleteMovieFromMyList.rejected.type]: (
      state: AuthState,
      action: PayloadAction<string>,
    ) => {
      state.isUpdating = false
      state.updateError = action.payload
    },
  },
})
export const { setAuthUser, logout, setIsSuccess, clearError } = authSlice.actions
export default authSlice.reducer
