import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getToken } from '../../../helpers/token'
import { IList } from '../../../models/IList'

export const fetchLists = createAsyncThunk<Array<IList>, {type?: string, genre?: string}>(
  'lists/fetchMovie',
  async function ({type, genre}, { rejectWithValue }) {
    try {
      let res = await axios({
        method: 'get',
        url: `/api/lists${type ? "?type=" + type : ""}${
          genre ? "&genre=" + genre : ""
        }`,
        headers: {
          token: getToken()},
      })
      let data = res.data
      return data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)


