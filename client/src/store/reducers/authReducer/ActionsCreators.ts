import axios from 'axios'
import { IUser, LoginData, RegisterData } from '../../../models/IUser'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const register = createAsyncThunk<{message: string}, RegisterData>(
  'auth/register',
  async function (registerData, { rejectWithValue }) {
    try {
      let res = await axios({
        method: 'post',
        url: '/api/auth/register',
        data: registerData,
      })

      let data = res.data
      return data
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  },
)

export const login = createAsyncThunk<IUser, LoginData>(
  'auth/login',
  async function (loginData, { rejectWithValue }) {
    try {
      let res = await axios({
        method: 'post',
        url: '/api/auth/login',
        data: loginData,
      })

      let data = res.data
      localStorage.setItem('user', JSON.stringify(res.data))
      return data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)
