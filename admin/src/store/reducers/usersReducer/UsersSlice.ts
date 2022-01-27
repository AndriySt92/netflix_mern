import { IUser } from '../../../models/IUser'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getUsers } from './ActionsCreators'

interface UsersState {
  users: Array<IUser> | null | undefined
  isLoading: boolean
  error: string
  isSuccess: boolean
}

const initialState: UsersState = {
  users: null,
  isLoading: false,
  error: '',
  isSuccess:false,
}

export const usersSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clear(state) {
      state.error = ''
      state.isSuccess = false
    },
  },
  extraReducers: {
    [getUsers.fulfilled.type]: (state: UsersState, action: PayloadAction<Array<IUser>>) => {
      state.isLoading = false
      state.error = ''
      state.users = action.payload
    },
    [getUsers.pending.type]: (state: UsersState ) => {
        state.isLoading = false
      },
    [getUsers.rejected.type]: (state: UsersState, action: PayloadAction<string>) => {
        state.isLoading = false
        state.error = action.payload
      },
  },
})

export const { clear } = usersSlice.actions
export default usersSlice.reducer