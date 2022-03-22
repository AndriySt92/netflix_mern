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
import { Error } from '../../components/error/Error';
import { Route } from 'react-router-dom';
import { MyList } from '../../components/myList/MyList';
import { SearchMovie } from '../../components/searchMovie/SearchMovie';
import { NewMoviesList } from '../../components/newMovieList/NewMovieList';


interface HomeProps {
    type?: 'series' | 'movies'
}

export const Home: React.FC<HomeProps> = ({type}) => {
    const [genre, setGenre] = useState<string>('')
    const dispatch = useAppDispatch()
    const {movie, error: errorMovie, isLoading: isLoadingMovie} = useAppSelector(state => state.movieReducer)
    const {searchedMovie, offerContent, isSearching, searchError} = useAppSelector(state => state.movieReducer)
    const {lists, error: errorLists, isLoading: isLoadingLists, myList, newMoviesList} = useAppSelector(state => state.listsReducer)
    const contentError = searchError || errorLists
    const isContentLoading = isLoadingLists || isSearching
    
    useEffect(() => {
      dispatch(fetchMovie({type}))
      dispatch(fetchLists({type, genre}))
    }, []);
   
    useEffect(() => {
      console.log(type)
      dispatch(fetchMovie({type}))
      dispatch(fetchLists({type, genre}))
    }, [type, genre]);
  
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
            <Route path='/myList'><MyList myList={myList} /></Route>
            <Route path='/newMovies'><NewMoviesList newMoviesList={newMoviesList} /></Route>
            <Route path='/searchMovie'><SearchMovie searchedMovie={searchedMovie} offerContent={offerContent} /></Route>
            {lists.map(list => <List list={list} key={list._id} />)}
        </div>
    )
}
