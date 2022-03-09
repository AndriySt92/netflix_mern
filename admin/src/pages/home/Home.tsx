import './home.css'
import { useEffect } from 'react'
import { Analytics } from '../analytics/Analytics'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { fetchLists } from '../../store/reducers/listReducer/ActionsCreators'
import { fetchMovies } from '../../store/reducers/moviesReducer/ActionsCreators'
import { MovieTable } from '../../components/movieTable/MovieTable'
import { ListTable } from '../../components/listsTable/ListsTable'
import { UsersTable } from '../../components/usersTable/UsersTable'
import { Error } from '../../components/error/Error'
import { Preloader } from '../../components/preloader/Preloader'
import { getUsers } from '../../store/reducers/usersReducer/ActionsCreators'
import { clearUserStats } from '../../store/reducers/usersReducer/UsersSlice'
import { clearMovieStats } from '../../store/reducers/moviesReducer/MoviesSlice'
import { clearListStats } from '../../store/reducers/listReducer/ListsSlice'

export default function Home() {
  const { lists, error: listsError, isLoading: isLoadingLists } = useAppSelector((state) => state.listsReducer)
  const { movies, error: moviesError, isLoading: isLoadingMovies } = useAppSelector((state) => state.moviesReducer)
  const { users, error: usersError, isLoading: isLoadingUsers } = useAppSelector((state) => state.usersReducer)
  const dispatch = useAppDispatch()
  const isLoading = isLoadingLists || isLoadingMovies || isLoadingUsers
  const error = listsError || moviesError || usersError

  useEffect(() => {
    dispatch(getUsers())
    dispatch(fetchMovies())
    dispatch(fetchLists())
    return () => {
        dispatch(clearMovieStats())
        dispatch(clearUserStats())
        dispatch(clearListStats())
    }
  }, [])

  if (error) {
    return <Error error={error} />
  }

  if (isLoading) {
    return <Preloader />
  }

  return (
    <div className="home">
      <div className="homeContent">
        <div className="homeAnalitycs">
          <Analytics />
        </div>
        <div className="homeTable">
          <MovieTable pageSize={4} movies={movies} actionType="edit" withoutAction />
          <ListTable pageSize={4} withoutAction lists={lists} />
          <UsersTable pageSize={4} withoutAction users={users} />
        </div>
      </div>
      <div className="homeInfo"></div>
    </div>
  )
}
