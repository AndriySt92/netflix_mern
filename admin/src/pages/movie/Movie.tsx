import React, { useEffect } from 'react'
import './movie.css'
import { Link, useParams } from 'react-router-dom'
import { clear } from '../../store/reducers/usersReducer/UsersSlice'
import { useAppDispatch } from '../../hooks/redux'
import { useAppSelector } from '../../hooks/redux'
import { fetchMovie } from '../../store/reducers/moviesReducer/ActionsCreators'
import { Preloader } from '../../components/preloader/Preloader'
import { Button, InputLabel } from '@mui/material'
import { MovieForm } from '../../components/movieForm/MovieForm'
import { Error } from '../../components/error/Error'


export const Movie: React.FC = () => {
  const { movie, error, isLoading } = useAppSelector((state) => state.moviesReducer)
  const dispatch = useAppDispatch()
  const { movieId } = useParams<{ movieId: string }>()

  useEffect(() => {
    dispatch(fetchMovie(movieId))
    return () => {
      dispatch(clear())
    }
  }, [])

  if(error) {
    return <Error error={error} />
  }
  
  if (isLoading || !movie) {
    return <Preloader />
  }



  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Update movie</h1>
        <Link to="/newMovie">
          <Button variant="contained">Create</Button>
        </Link>
      </div>

      <div className="productTop">
        <MovieForm text="update" movie={movie} />
      </div>
      <div className="productBottom">
        <div className="productInfo">
          <div className="movieInfoItem">
            <InputLabel htmlFor="title">Movie title</InputLabel>
            {movie.title}
          </div>
          <div className="movieInfoItem desc">
            <InputLabel htmlFor="desc">Movie description</InputLabel>
            <span>{movie.desc}</span>
          </div>
          <div className="movieInfoItem">
            <InputLabel htmlFor="genre">Movie genre</InputLabel>
            {movie.genre}
          </div>
          <div className="movieInfoItem">
            <InputLabel htmlFor="limit">Movie limit</InputLabel>
            {movie.limit}
          </div>
          <div className="movieInfoItem">
            <InputLabel htmlFor="year">Movie year</InputLabel>
            {movie.year}
          </div>
          <div className="movieInfoItem">
            <InputLabel htmlFor="duration">Movie duration</InputLabel>
            {movie.duration}
          </div>
          <div className="movieInfoItem">
            <InputLabel htmlFor="isSeriel">Is seriel</InputLabel>
            {movie.isSerial ? 'Yes' : 'No'}
          </div>
          <div className="movieInfoItem">
            <InputLabel htmlFor="img">Movie image </InputLabel>
           <div><img src={movie.img} alt="" /></div> 
          </div>
          <div className="movieInfoItem">
            <InputLabel htmlFor="imgSm">Movie image small</InputLabel>
            <div><img src={movie.imgSm} alt="" /></div>
          </div>
          <div className="movieInfoItem">
            <InputLabel htmlFor="img">Movie image title</InputLabel>
           <div> <img src={movie.imgTitle} alt="" /></div>
          </div>
          <div className="movieInfoItem">
            <InputLabel htmlFor="video">Movie video</InputLabel>
            <video src={movie.video} controls />
          </div>
          <div className="movieInfoItem">
            <InputLabel htmlFor="trailer">Movie trailer</InputLabel>
            <video src={movie.trailer} controls />
          </div>
        </div>
      </div>
    </div>
  )
}
