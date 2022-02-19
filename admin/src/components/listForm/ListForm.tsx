import React, { useEffect, useState } from 'react'
import './listForm.css'
import { InputLabel, Snackbar, TextField } from '@material-ui/core'
import Button from '@mui/material/Button'
import { Alert } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import {
  createMovie,
  fetchMovies,
  updateMovie,
} from '../../store/reducers/moviesReducer/ActionsCreators'
import { Preloader } from '../preloader/Preloader'
import { Error } from '../error/Error'
import { clear } from '../../store/reducers/moviesReducer/MoviesSlice'
import { IList } from '../../models/IList'
import { MovieTable } from '../movieTable/MovieTable'

interface ListFormProps {
  list?: IList
  text: 'update' | 'create'
}
export const ListForm: React.FC<ListFormProps> = React.memo(({ text, list }) => {
  const dispatch = useAppDispatch()
  const { isLoading, error, isSuccess, movies } = useAppSelector((state) => state.moviesReducer)
  const [title, setTitle] = useState<string>(list?.title || '')
  const [type, setType] = useState<string>(list?.type || '')
  const [genre, setGenre] = useState<string>(list?.genre || '')
  const [content, setContent] = useState<Array<string>>(list?.content || [])
  const [open, setOpen] = useState<boolean>(true)

  useEffect(() => {
    if (!movies) {
      dispatch(fetchMovies())
    }
  }, [])

  useEffect(() => {
    if (isSuccess === true) {
      setOpen(true)
      setTimeout(() => {
        dispatch(clear())
      }, 3000)
    } else {
      setOpen(false)
    }
  }, [isSuccess])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    let listData = {
      title,
      genre,
      type,
      content,
    }
    if (text === 'update') {
      const _id = list?._id
      dispatch(updateMovie({ ...listData, _id }))
    } else if (text === 'create') {
      dispatch(createMovie(listData))
    }
  }

  if (isLoading) {
    return <Preloader />
  }
  if (error) {
    return <Error error={error} />
  }

  return (
    <>
      <Snackbar open={open}>
        <Alert severity="success" sx={{ width: '100%' }}>
          List {title} was {text}d successfull
        </Alert>
      </Snackbar>
      <form className="addProductForm" onSubmit={handleSubmit}>
        <div className="addProductItem">
          <InputLabel htmlFor="title">List title</InputLabel>
          <TextField
            name="title"
            id="standard-basic"
            placeholder="title"
            variant="standard"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <InputLabel htmlFor="type">List type</InputLabel>
          <TextField
            name="type"
            id="standard-basic"
            placeholder="type"
            variant="standard"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <InputLabel htmlFor="genre">List genre</InputLabel>
          <TextField
            name="genre"
            id="standard-basic"
            placeholder="genre"
            variant="standard"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>
        <div className="addProductButton">
          <Button type="submit" variant="contained">
            {text}
          </Button>
        </div>
      </form>
      <MovieTable movies={movies} actionType="add" list={list} />
    </>
  )
})
