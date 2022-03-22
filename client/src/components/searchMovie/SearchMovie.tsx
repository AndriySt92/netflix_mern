import React, { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux'
import { IMovie } from '../../models/IMovie';
import { closeSearchMovie } from '../../store/reducers/movieReducer/MovieSlice';
import { Movie } from '../movie/Movie';

interface SearchMovieProps {
  searchedMovie: IMovie | null,
  offerContent: Array<IMovie> | null
}

export const SearchMovie: React.FC<SearchMovieProps> = ({searchedMovie, offerContent}) => {
  const history = useHistory()
  const location = useLocation()
  const dispatch = useAppDispatch()

useEffect(() => {
  return () => {
    dispatch(closeSearchMovie())
  }
}, [])


  useEffect(() => {
    if(searchedMovie){
    history.push({
      pathname: location.pathname,
      search: `?title=${searchedMovie.title}`
    })
    } else {
      history.push({
        pathname: location.pathname,
        search: ''
      })
    }
  }, [searchedMovie]);
  
  return (
    <div>
      {searchedMovie && offerContent && <Movie movie={searchedMovie} offerContent={offerContent}/>} 
    </div>
  )
}
