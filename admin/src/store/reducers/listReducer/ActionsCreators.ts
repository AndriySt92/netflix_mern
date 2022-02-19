import axios from 'axios'
import { getToken } from '../../../helpers/token'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { uploadFile } from '../../../helpers/uploadFile'
import { IList } from '../../../models/IList'
import { IMovie } from '../../../models/IMovie'

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
    try {

      let res = await axios({
        method: 'put',
        url: `/api/lists/${listData._id}`,
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

export const fetchMovie = createAsyncThunk<IMovie, string>(
  'lists/fetchMovie',
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

export const addMovie = createAsyncThunk<string, {id: string, listId: string}>(
  'lists/addMovie',
  async function (dataId, { rejectWithValue }) {
    try {
      let res = await axios({
        method: 'put',
        url: `/api/lists/${dataId.listId}`,
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
