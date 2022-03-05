import React, { useEffect } from 'react'
import { Chart } from '../../components/chart/Chart'
import { Error } from '../../components/error/Error'
import { Preloader } from '../../components/preloader/Preloader'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { fetchListStats } from '../../store/reducers/listReducer/ActionsCreators'
import { fetchMovieStats } from '../../store/reducers/moviesReducer/ActionsCreators'
import { fetchUserStats } from '../../store/reducers/usersReducer/ActionsCreators'

export const Analytics = () => {
  const dispatch = useAppDispatch()
  const { userStats, isLoadingUserStats, error: userError } = useAppSelector((state) => state.usersReducer)
  const { listStats, isLoadingListStats, error: listError  } = useAppSelector((state) => state.listsReducer)
  const { movieStats, isLoadingMovieStats, error: moiveError  } = useAppSelector((state) => state.moviesReducer)
  
  const isLoading = isLoadingUserStats || isLoadingListStats || isLoadingMovieStats
  const error = userError || listError || moiveError
  useEffect(() => {
    dispatch(fetchUserStats())
    dispatch(fetchMovieStats())
    dispatch(fetchListStats())
  }, [])

  if (error) {
    return <Error error={error} />
  }

  if (isLoading) {
    return <Preloader />
  }

  return (
    <div className="userAnalytics">
      <Chart title="User Analytics" data={userStats} dataKey="Users total count" />
      <Chart title="Movie Analytics" data={movieStats} dataKey="Moives total count" />
      <Chart title="List Analytics" data={listStats} dataKey="Lists total count" />
    </div>
  )
}
