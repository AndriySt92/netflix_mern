import React, { useEffect, useState } from 'react'
import './movieForm.css'
import { InputLabel, Snackbar, TextField } from '@material-ui/core'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import { Alert, MenuItem } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { createMovie } from '../../store/reducers/moviesReducer/ActionsCreators'
import { Preloader } from '../preloader/Preloader'
import { Error } from '../error/Error'
import { clear } from '../../store/reducers/moviesReducer/MoviesSlice'

export const MovieForm: React.FC<{text: 'update' | 'create'}> = ({text}) => {
  const dispatch = useAppDispatch()
  const { isLoading, error, isSuccess } = useAppSelector((state) => state.moviesReducer)
  const [title, setTitle] = useState<string>('')
  const [desc, setDesc] = useState<string>('')
  const [limit, setLimit] = useState<string>('')
  const [genre, setGenre] = useState<string>('')
  const [isSerial, setIsSerial] = useState<boolean>(false)
  const [year, setYear] = useState<string>('')
  const [duration, setDuration] = useState<string>('')
  const [img, setImg] = useState<File | null>(null)
  const [imgTitle, setImgTitle] = useState<File | null>(null)
  const [imgSm, setImgSm] = useState<File | null>(null)
  const [trailer, setTrailer] = useState<File | null>(null)
  const [video, setVideo] = useState<File | null>(null)
  const [open, setOpen] = useState<boolean>(true)

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

    let movieData = {
      title,
      desc,
      genre,
      duration,
      year,
      limit,
      isSerial,
      trailer,
      imgSm,
      imgTitle,
      img,
      video,
    }
    dispatch(createMovie(movieData))
  }

  if (isLoading) {
    return <Preloader />
  }
  if (error) {
    return <Error error={error} />
  }

  return (
    <>
      {true && (
        <Snackbar open={open} autoHideDuration={6000}>
          <Alert severity="success" sx={{ width: '100%' }}>
            Movie {title} was {text}d successfull
          </Alert>
        </Snackbar>
      )}
      <form className="addProductForm" onSubmit={handleSubmit}>
        <div className="addProductItem">
          <InputLabel htmlFor="title">Movie title</InputLabel>
          <TextField
            name="title"
            id="standard-basic"
            placeholder="title"
            variant="standard"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <InputLabel htmlFor="desc">Movie description</InputLabel>
          <TextField
            name="desc"
            id="standard-basic"
            placeholder="description"
            variant="standard"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <InputLabel htmlFor="genre">Movie genre</InputLabel>
          <TextField
            name="genre"
            id="standard-basic"
            placeholder="genre"
            variant="standard"
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <InputLabel htmlFor="limit">Movie limit</InputLabel>
          <TextField
            name="limit"
            id="standard-basic"
            placeholder="limit"
            variant="standard"
            onChange={(e) => setLimit(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <InputLabel htmlFor="year">Movie year</InputLabel>
          <TextField
            name="year"
            id="standard-basic"
            placeholder="year"
            variant="standard"
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <InputLabel htmlFor="duration">Movie duration</InputLabel>
          <TextField
            name="duration"
            id="standard-basic"
            placeholder="duration"
            variant="standard"
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <InputLabel htmlFor="isSeriel">Is seriel</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={isSerial}
            onChange={(e) => setIsSerial(!!e.target.value)}
            label="isSeriel">
            <MenuItem value="true">Yes</MenuItem>
            <MenuItem value="false">No</MenuItem>
          </Select>
        </div>
        <div className="addProductItem">
          <label>Movie image</label>
          <input
            type="file"
            id="img"
            name="img"
            onChange={(e) => setImg(e.target.files && e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Movie image small</label>
          <input
            type="file"
            id="img"
            name="imgSm"
            onChange={(e) => setImgSm(e.target.files && e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Movie image title</label>
          <input
            type="file"
            id="img"
            name="img"
            onChange={(e) => setImgTitle(e.target.files && e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Movie trailer</label>
          <input
            type="file"
            id="img"
            name="trailer"
            onChange={(e) => setTrailer(e.target.files && e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Movie video</label>
          <input
            type="file"
            name="video"
            onChange={(e) => setVideo(e.target.files && e.target.files[0])}
          />
        </div>
        <div className="addProductButton">
          <Button type="submit" variant="contained">
            {text}
          </Button>
        </div>
      </form>
    </>
  )
}
