// import Chart from "../../components/chart/Chart";
import './home.css'
import { useEffect } from 'react'
import { Analytics } from '../analytics/Analytics'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { fetchLists } from '../../store/reducers/listReducer/ActionsCreators'
import { fetchMovies } from '../../store/reducers/moviesReducer/ActionsCreators'
import { MovieTable } from '../../components/movieTable/MovieTable'
import { ListTable } from '../../components/listsTable/ListsTable'
import { UsersTable } from '../../components/usersTable/UsersTable'

export default function Home() {
  // const { lists, error: listsError, isLoading: listsIsLoading } = useAppSelector((state) => state.listsReducer)
  const { movies, error: moviesError, isLoading: moivesIsLoading } = useAppSelector((state) => state.moviesReducer)
  // const { users, error: usersError, isLoading: usersIsLoading } = useAppSelector((state) => state.usersReducer)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchLists())
    dispatch(fetchMovies())
    dispatch(fetchLists())
  }, [])

  return (
    <div className="home">
      <div className="homeContent">
        <div className="homeAnalitycs">
          <Analytics />
        </div>
        <div className="homeTable">
          <MovieTable pageSize={4} movies={movies} actionType="edit" justDisplay={true} />
          <ListTable pageSize={4} />
          <UsersTable pageSize={4} />
        </div>
      </div>
      <div className="homeInfo"></div>
    </div>
  )
}
