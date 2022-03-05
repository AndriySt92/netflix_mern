import axios from 'axios'
import { IUser } from '../../../models/IUser'
import { getToken } from '../../../helpers/token'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { DataStats } from '../../../components/chart/Chart'
// import { removeUser, setError } from './UsersSlice'

export const getUsers = createAsyncThunk<Array<IUser>>(
  'users/getUsers',
  async function (_, { rejectWithValue }) {
    try {
      let res = await axios({
        method: 'get',
        url: '/api/users/',
        headers: {
          token: getToken(),
        },
      })
      let data = res.data
      return data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

export const updateUser = createAsyncThunk<IUser, IUser>(
  'users/updateUser',
  async function (userData, { rejectWithValue }) {
    try {
      let res = await axios({
        method: 'put',
        url: `/api/users/${userData._id}`,
        data: userData,
        headers: {
          token: getToken(),
        },
      })
      let data = res.data
      return data
    } catch (error) {
      if (error.response.status == 500) {
        return rejectWithValue(error.response.statusText)
      }
      return rejectWithValue(error.response.data)
    }
  },
)

export const getUser = createAsyncThunk<IUser, string>(
  'users/getUser',
  async function (id, { rejectWithValue }) {
    try {
      let res = await axios({
        method: 'get',
        url: `/api/users/find/${id}`,
        headers: {
          token: getToken(),
        },
      })
      let data = res.data
      return data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async function (id: string, { rejectWithValue, dispatch }) {
    try {
      let res = await axios({
        method: 'delete',
        url: `/api/users/${id}`,
        headers: {
          token: getToken(),
        },
      })
      return id
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

export const fetchUserStats = createAsyncThunk<Array<DataStats>>(
  'users/fetchUsersStat',
  async function (_, { rejectWithValue }) {
    try {
      let res = await axios({
        method: 'get',
        url: `/api/users/stats`,
        headers: {
          token: getToken(),
        },
      })
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)
