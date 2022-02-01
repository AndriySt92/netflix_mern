import axios from 'axios'
import { IMovie } from '../../../models/IMovie'
import { getToken } from '../../../helpers/token'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchMovies = createAsyncThunk<Array<IMovie>>(
  'movies/fetchMovies',
  async function (_, { rejectWithValue }) {
    try {
      let res = await axios({
        method: 'get',
        url: '/api/movies/',
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

export const updateMovie = createAsyncThunk<IMovie, IMovie>(
  'movies/updateMovie',
  async function (movieData, { rejectWithValue }) {
    try {
      let res = await axios({
        method: 'put',
        url: `/api/movies/${movieData._id}`,
        data: movieData,
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

export const createMovie = createAsyncThunk<IMovie, IMovie>(
  'movies/createMovie',
  async function (movieData, { rejectWithValue }) {
    try {
      let res = await axios({
        method: 'post',
        url: `/api/movies/`,
        data: movieData,
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

export const fetchMovie = createAsyncThunk<IMovie, string>(
  'movies/fetchMovie',
  async function (id, { rejectWithValue }) {
    try {
      let res = await axios({
        method: 'get',
        url: `/api/movies/find/${id}`,
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

export const deleteMovie = createAsyncThunk(
  'movies/deleteMovie',
  async function (id: string, { rejectWithValue, dispatch }) {
    try {
      let res = await axios({
        method: 'delete',
        url: `/api/movies/${id}`,
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
