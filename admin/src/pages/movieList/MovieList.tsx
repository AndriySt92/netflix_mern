import React, { useEffect } from 'react'
import './movieList.css'
import { useAppDispatch } from '../../hooks/redux'
import { useAppSelector } from '../../hooks/redux'
import { fetchMovies } from '../../store/reducers/moviesReducer/ActionsCreators'
import { clear } from '../../store/reducers/usersReducer/UsersSlice'
import { Preloader } from '../../components/preloader/Preloader'
import { Error } from '../../components/error/Error'
import { MovieTable } from '../../components/movieTable/MovieTable'

export const MovieList: React.FC = () => {
  const { movies, error, isLoading } = useAppSelector((state) => state.moviesReducer)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchMovies())
    return () => {
      dispatch(clear())
    }
  }, [])

  if (error) {
    return <Error error={error} />
  }

  if (isLoading || !movies) {
    return <Preloader />
  }

  return (
    <div className="productList">
      <MovieTable pageSize={15} movies={movies} actionType="edit" />
    </div>
  )
}
