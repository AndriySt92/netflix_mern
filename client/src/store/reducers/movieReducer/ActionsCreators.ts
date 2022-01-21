import axios from 'axios'
import { IMovie } from '../../../models/IMovie'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getToken } from '../../../helpers/token'

axios.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`

export const fetchMovie = createAsyncThunk<IMovie, string>(
  'movie/fetchMovie',
  async function (type, { rejectWithValue }) {
    try {
      let res = await axios({
        method: 'get',
        url: `/api/movies/random?type=${type}`,
        headers: {
          token:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYzlhNWY1YmQ0Mzc3ZmNjZmIyMTUwZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0Mjc2NTM1MCwiZXhwIjoxNjQzMTk3MzUwfQ.hi4-VwrE2i4S5iVZWvp7p35Me3DbVOyPrM_2LBAvBBc',
        },
      })
      let data = res.data
      return data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)
