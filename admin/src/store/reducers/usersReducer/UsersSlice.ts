import { IUser } from '../../../models/IUser'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchUserStats, getUsers, updateUser, getUser, deleteUser } from './ActionsCreators'
import { IDataStats } from '../../../models/IDataStats'

interface UsersState {
  users: Array<IUser> | null | undefined
  isLoading: boolean
  error: string
  isSuccess: boolean
  updateError: string
  deleteError: string
  user: IUser | null
  userStats: Array<IDataStats> | null
  isLoadingUserStats: boolean
}

const initialState: UsersState = {
  users: null,
  isLoading: false,
  error: '',
  isSuccess: false,
  updateError: '',
  deleteError: '',
  user: null,
  userStats: null,
  isLoadingUserStats: false
}

export const usersSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clear(state) {
      state.error = ''
      state.isSuccess = false
    }, 
    clearUserStats(state) {
      state.userStats = null
    }, 
    
  },
  extraReducers: {
    [getUsers.fulfilled.type]: (state: UsersState, action: PayloadAction<Array<IUser>>) => {
      state.isLoading = false
      state.error = ''
      state.users = action.payload
    },
    [getUsers.pending.type]: (state: UsersState) => {
      state.isLoading = false
    },
    [getUsers.rejected.type]: (state: UsersState, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    [updateUser.fulfilled.type]: (state: UsersState, action: PayloadAction<IUser>) => {
      state.users = state.users?.map((item) => {
        if (item._id === action.payload._id) {
          return action.payload
        } else {
          return item
        }
      })
      state.isSuccess = true
      state.isLoading = false
    },
    [updateUser.pending.type]: (state: UsersState) => {
      state.isLoading = true
    },
    [updateUser.rejected.type]: (state: UsersState, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isSuccess = false
      state.isLoading = false
    },
    [getUser.fulfilled.type]: (state: UsersState, action: PayloadAction<IUser>) => {
      state.user = action.payload
      state.isLoading = false
    },
    [getUser.pending.type]: (state: UsersState) => {
      state.isLoading = true
    },
    [getUser.rejected.type]: (state: UsersState, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    },
    [deleteUser.fulfilled.type]: (state: UsersState, action: PayloadAction<string>) => {
      state.users = state.users?.filter(user => user._id !== action.payload)
    },
    [deleteUser.rejected.type]: (state: UsersState, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    [fetchUserStats.fulfilled.type]: (state: UsersState, action: PayloadAction<Array<IDataStats>>) => {
      state.userStats = action.payload
      state.isLoadingUserStats = false
    },
    [fetchUserStats.pending.type]: (state: UsersState) => {
      state.isLoadingUserStats = true
    },
    [fetchUserStats.rejected.type]: (state: UsersState, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoadingUserStats = false
    },
  },
})

export const { clear, clearUserStats } = usersSlice.actions
export default usersSlice.reducer
