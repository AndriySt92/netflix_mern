import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getToken } from '../../../helpers/token'
import { IList } from '../../../models/IList'
import { IMovie } from '../../../models/IMovie'
import { RootState } from '../../store'

export const fetchLists = createAsyncThunk<Array<IList>, {type?: string, genre?: string}>(
  'lists/fetchMovie',
  async function ({type, genre}, { rejectWithValue }) {
    try {
      let res = await axios({
        method: 'get',
        url: `/api/lists/?${type ? "type=" + type : ""}${
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

export const fetchMyList = createAsyncThunk<IMovie, string>(
  'lists/fetchMyList',
  async function (id, { rejectWithValue, getState }) {

    // //@ts-ignore
    // const state: RootState = getState()

    // if(state.authReducer.user?.myList.length === state.listsReducer.myList.length && state.listsReducer.myList.length) return 

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

export const fetchNewMovies = createAsyncThunk<Array<IMovie>>(
  'lists/fetchNewMovies',
  async function (_, { rejectWithValue }) {

    try {
      let res = await axios({
        method: 'get',
        url: '/api/movies/?newMovies=true',
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


