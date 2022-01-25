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


interface HomeProps {
    type?: 'series' | 'movies'
}

export const Home: React.FC<HomeProps> = ({type}) => {
    const [genre, setGenre] = useState<string>('')
    const dispatch = useAppDispatch()
    const {movie, error: errorMovie, isLoading: isLoadingMovie} = useAppSelector(state => state.movieReducer)
    const {lists, error: errorLists, isLoading: isLoadingLists} = useAppSelector(state => state.listsReducer)
    
    useEffect(() => {
      dispatch(fetchMovie({type}))
      dispatch(fetchLists({type, genre}))
    }, []);
   
    useEffect(() => {
      dispatch(fetchMovie({type}))
      dispatch(fetchLists({type, genre}))
    }, [type, genre]);
  
    if(isLoadingMovie || isLoadingLists){
      return <Loading />
    }
  
    if (errorMovie || errorLists) {
      return <div className='fetchError'>ERROR. {errorMovie}.{errorLists}</div>
    }

    return (
        <div className='home'>
            <Navbar />
            <Featured type='movie' movie={movie as IMovie} setGenre={setGenre}/>
            {lists.map(list => <List list={list} key={list._id} />)}
        </div>
    )
}
