import axios from 'axios'
import { IMovie } from '../../../models/IMovie'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getToken } from '../../../helpers/token'


export const fetchMovie = createAsyncThunk<IMovie, string>(
  'movie/fetchMovie',
  async function (type, { rejectWithValue }) {
    try {
      let res = await axios({
        method: 'get',
        url: `/api/movies/random?type=${type}`,
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
export const fetchShowById = async function (id: string) {
  try {
    let res = await axios({
      method: 'get',
      url: `/api/movies/find/${id}`,
      headers: {
        token: getToken()},
    })
    let data = res.data
    return data
  } catch (error) {
    return error.response.data
  }
}
