import React, {useEffect}  from 'react'
import {Navbar} from "../../components/navbar/Navbar";
import {Featured} from "../../components/featured/Featured";
import {List} from "../../components/list/List";
import "./home.scss";
import { Loading } from '../../components/Loading/Loading';
import { IMovie } from '../../models/IMovie'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { fetchMovie } from '../../store/reducers/movieReducer/ActionsCreators'


interface HomeProps {
    type?: 'series' | 'movies'
}

export const Home: React.FC<HomeProps> = ({type = 'movie'}) => {
    const dispatch = useAppDispatch()
    const {movie, error, isLoading} = useAppSelector(state => state.movieReducer)
  
    useEffect(() => {
      dispatch(fetchMovie(type))
    }, []);
   
    useEffect(() => {
      dispatch(fetchMovie(type))
    }, [type]);
  
    if(isLoading){
      return <Loading />
    }
  
    if (error) {
      return <div className='fetchError'>ERROR. {error}</div>
    }

    return (
        <div className='home'>
            <Navbar />
            <Featured type='movie' movie={movie as IMovie}/>
            <List />
            <List />
            <List />
            <List />
        </div>
    )
}
