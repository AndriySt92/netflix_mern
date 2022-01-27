import axios from 'axios'
import { IUser } from '../../../models/IUser'
import { getToken } from '../../../helpers/token'
import { createAsyncThunk } from '@reduxjs/toolkit'

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
