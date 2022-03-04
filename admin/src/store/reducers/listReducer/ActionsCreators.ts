import axios from 'axios'
import { getToken } from '../../../helpers/token'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { IList } from '../../../models/IList'
import { IMovie } from '../../../models/IMovie'
import { RootState } from '../../store'

export const fetchLists = createAsyncThunk<Array<IList>>(
  'lists/fetchLists',
  async function (_, { rejectWithValue }) {
    try {
      let res = await axios({
        method: 'get',
        url: '/api/lists/',
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

export const updateList = createAsyncThunk<IList, any>(
  'lists/updateList',
  async function (listData, { rejectWithValue }) {
    const { _id, ...restData } = listData
    try {
      let res = await axios({
        method: 'put',
        url: `/api/lists/${_id}`,
        data: restData,
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

export const createList = createAsyncThunk<IList, IList>(
  'lists/createList',
  async function (listData, { rejectWithValue }) {
    try {
      let res = await axios({
        method: 'post',
        url: `/api/lists/`,
        data: listData,
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

export const fetchList = createAsyncThunk<IList, string>(
  'lists/fetchList',
  async function (id, { rejectWithValue }) {
    try {
      let res = await axios({
        method: 'get',
        url: `/api/lists/find/${id}`,
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

export const deleteList = createAsyncThunk<string, string>(
  'lists/deleteList',
  async function (id, { rejectWithValue }) {
    try {
      let res = await axios({
        method: 'delete',
        url: `/api/lists/${id}`,
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

export const fetchMovie = createAsyncThunk<IMovie | null, string>(
  'lists/fetchMovie',
  async function (id, { rejectWithValue, getState }) {
    //@ts-ignore
    const state: RootState = getState()
    const listMovies = state.listsReducer.listMovies.filter((movie: IMovie) => movie._id === id)
    if (listMovies.length) return
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

export const addContent = createAsyncThunk<string, { id: string; listId: string }>(
  'lists/addContent',
  async function (dataId, { rejectWithValue }) {
    try {
      let res = await axios({
        method: 'put',
        url: `/api/lists/addMovie/${dataId.listId}`,
        data: { id: dataId.id },
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

export const deleteContent = createAsyncThunk<void, { id: string; listId: string }>(
  'lists/deleteContent',
  async function (dataId, { rejectWithValue }) {
    try {
      let res = await axios({
        method: 'put',
        url: `/api/lists/deleteMovie/${dataId.listId}`,
        data: { id: dataId.id },
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
