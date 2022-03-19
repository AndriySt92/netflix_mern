import axios from 'axios'
import { IUser, LoginData, RegisterData } from '../../../models/IUser'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getToken } from '../../../helpers/token'

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

export const addMovieToMyList = createAsyncThunk<IUser, {movieId: string}>(
  'auth/addMovieToMyList',
  async function (ids, { rejectWithValue }) {
    try {
      let res = await axios({
        method: 'post',
        url: `/api/users/addMovie`,
        data: {id: ids.movieId},
        headers: {
          token: getToken()},
      })
      const {myList} = res.data
      const user = JSON.parse(localStorage.getItem('user') as string)
      user.myList = myList
      localStorage.setItem('user', JSON.stringify(user))
      return user
    } catch (error) {
      if (error.response.status == 500) {
        return rejectWithValue(error.response.statusText)
      }
      return rejectWithValue(error.response.data)
    }
  },
)

export const deleteMovieFromMyList = createAsyncThunk<IUser, {movieId: string}>(
  'auth/deleteMovieFromMyList',
  async function (ids, { rejectWithValue }) {
    try {
      let res = await axios({
        method: 'delete',
        url: `/api/users/deleteMovie/${ids.movieId}`,
        headers: {
          token: getToken()},
      })
      const {myList} = res.data
      const user = JSON.parse(localStorage.getItem('user') as string)
      user.myList = myList
      localStorage.setItem('user', JSON.stringify(user))
      return user
    } catch (error) {
      if (error.response.status == 500) {
        return rejectWithValue(error.response.statusText)
      }
      return rejectWithValue(error.response.data)
    }
  },
)