import React, { useEffect } from 'react'
import { useAppDispatch } from '../../hooks/redux'
import { IMovie } from '../../models/IMovie'
import { fetchNewMovies } from '../../store/reducers/ListsReducer/ActionsCreators'
import { List } from '../list/List'

interface NewMoviesListProps {
  newMoviesList: Array<IMovie>
}

export const NewMoviesList: React.FC<NewMoviesListProps> = ({newMoviesList}) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if(newMoviesList.length) return
    dispatch(fetchNewMovies())
  }, [])

  return <div><List content={newMoviesList} title='The Newest Movies' /></div>
}
