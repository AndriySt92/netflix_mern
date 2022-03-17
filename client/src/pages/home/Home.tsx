import React, {useEffect, useState}  from 'react'
import {Navbar} from "../../components/navbar/Navbar";
import {Featured} from "../../components/featured/Featured";
import {List} from "../../components/list/List";
import "./home.scss";
import { Loading } from '../../components/Loading/Loading';
import { IMovie } from '../../models/IMovie'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { fetchMovie } from '../../store/reducers/movieReducer/ActionsCreators'
import { fetchLists } from '../../store/reducers/ListsReducer/ActionsCreators';
import { Movie } from '../../components/movie/Movie';
import { Error } from '../../components/error/Error';
import { useHistory, useLocation } from 'react-router-dom';


interface HomeProps {
    type?: 'series' | 'movies'
}

export const Home: React.FC<HomeProps> = ({type}) => {
    const [genre, setGenre] = useState<string>('')
    const dispatch = useAppDispatch()
    const history = useHistory()
    const location = useLocation();
    const {movie, error: errorMovie, isLoading: isLoadingMovie} = useAppSelector(state => state.movieReducer)
    const {searchedMovie,offerContent, isSearching, searchError} = useAppSelector(state => state.movieReducer)
    const {lists, error: errorLists, isLoading: isLoadingLists} = useAppSelector(state => state.listsReducer)
    const contentError = searchError || errorLists
    const isContentLoading = isLoadingLists || isSearching
    
    useEffect(() => {
      dispatch(fetchMovie({type}))
      dispatch(fetchLists({type, genre}))
    }, []);
   
    useEffect(() => {
      dispatch(fetchMovie({type}))
      dispatch(fetchLists({type, genre}))
    }, [type, genre]);

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
  
    if(isLoadingMovie){
      return <Loading />
    }
  
    if (errorMovie) {
      return <div className='fetchError'>ERROR. {errorMovie}.{errorLists}</div>
    }

    return (
        <div className='home'>
            <Navbar />
            <Featured type='movie' movie={movie as IMovie} setGenre={setGenre}/>
            {contentError && <Error error={contentError} />}
            {isContentLoading && <Loading smallLoader />}
            {searchedMovie && offerContent ? <Movie movie={searchedMovie} offerContent={offerContent}/> : lists.map(list => <List list={list} key={list._id} />)}
        </div>
    )
}
