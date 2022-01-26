import { IUser } from '../../../models/IUser'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { login } from './ActionsCreators'

interface AuthState {
  user: IUser | null | undefined
  isLoading: boolean
  error: string
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: '',
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
  },
  extraReducers: {
    [login.fulfilled.type]: (state: AuthState, action: PayloadAction<IUser>) => {
      state.isLoading = false
      state.error = ''
      state.user = action.payload
    },
    [login.pending.type]: (state: AuthState ) => {
        state.isLoading = false
      },
    [login.rejected.type]: (state: AuthState, action: PayloadAction<string>) => {
        state.isLoading = false
        state.error = action.payload
      },
  },
})

export const { setAuthUser, logout} = authSlice.actions
export default authSlice.reducer