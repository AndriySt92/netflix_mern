import React, { useEffect, useMemo, useState } from 'react'
import './analytics.css'
import { Chart } from '../../components/chart/Chart'
import { Error } from '../../components/error/Error'
import { Preloader } from '../../components/preloader/Preloader'
import { StatsTable } from '../../components/statsTable/StatsTable'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { fetchListStats } from '../../store/reducers/listReducer/ActionsCreators'
import { fetchMovieStats } from '../../store/reducers/moviesReducer/ActionsCreators'
import { fetchUserStats } from '../../store/reducers/usersReducer/ActionsCreators'
import { IDataStats } from '../../models/IDataStats'
import { clearUserStats } from '../../store/reducers/usersReducer/UsersSlice'
import { clearMovieStats } from '../../store/reducers/moviesReducer/MoviesSlice'
import { clearListStats } from '../../store/reducers/listReducer/ListsSlice'

export interface DataStats {
  month: string
  'Total count': string
}

export const Analytics = React.memo(() => {
  const dispatch = useAppDispatch()
  const {
    userStats,
    isLoadingUserStats,
    error: userError,
  } = useAppSelector((state) => state.usersReducer)
  const {
    listStats,
    isLoadingListStats,
    error: listError,
  } = useAppSelector((state) => state.listsReducer)
  const {
    movieStats,
    isLoadingMovieStats,
    error: moiveError,
  } = useAppSelector((state) => state.moviesReducer)
  const [userStatsByMonth, setUserStatsByMonth] = useState<Array<DataStats>>([])
  const [listStatsByMonth, setListStatsByMonth] = useState<Array<DataStats>>([])
  const [movieStatsByMonth, setMovieStatsByMonth] = useState<Array<DataStats>>([])
  const isLoading = isLoadingUserStats || isLoadingListStats || isLoadingMovieStats
  const error = userError || listError || moiveError

  const MONTHS = useMemo(
    () => [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    [],
  )

  useEffect(() => {
    dispatch(fetchUserStats())
    dispatch(fetchMovieStats())
    dispatch(fetchListStats())
  }, [])

  const sortDataStats = (
    dataStats: Array<IDataStats>,
  ): Array<IDataStats> | null => {
    if (dataStats) {
      const copyDataStats = [...dataStats]
      const sortedDataStats = copyDataStats.sort((a: any, b: any) => a._id - b._id)
      return sortedDataStats
    }
    return null
  }

  useEffect(() => {
    if (userStats) {
      const sortedUserStats = sortDataStats(userStats)
      sortedUserStats?.map((item) => {
        //@ts-ignore
        setUserStatsByMonth((prev) => [
          ...prev,
          //@ts-ignore
          { month: MONTHS[item._id - 1], 'Total count': item.total },
        ])
      })
    }
  }, [userStats])

  useEffect(() => {
    if (listStats) {
      const sortedListStats = sortDataStats(listStats)
      sortedListStats?.map((item) => {
        //@ts-ignore
        setListStatsByMonth((prev) => [
          ...prev,
          //@ts-ignore
          { month: MONTHS[item._id - 1], 'Total count': item.total },
        ])
      })
    }
    return () => {
      dispatch(clearMovieStats())
      dispatch(clearUserStats())
      dispatch(clearListStats())
    }
  }, [listStats])

  useEffect(() => {
    if (movieStats) {
      const sortedMovieStats = sortDataStats(movieStats)
      sortedMovieStats?.map((item) => {
        //@ts-ignore
        setMovieStatsByMonth((prev) => [
          ...prev,
          //@ts-ignore
          { month: MONTHS[item._id - 1], 'Total count': item.total },
        ])
      })
    }
  }, [movieStats])

  if (error) {
    return <Error error={error} />
  }

  if (isLoading) {
    return <Preloader />
  }

  return (
    <div className="analytics">
      <Chart title="User Analytics" data={userStatsByMonth} dataKey="Total count" />
      <Chart title="Movie Analytics" data={movieStatsByMonth} dataKey="Total count" />
      <Chart title="List Analytics" data={listStatsByMonth} dataKey="Total count" />
      <div className="statsTable">
        <StatsTable data={userStatsByMonth} />
        <StatsTable data={movieStatsByMonth} />
        <StatsTable data={listStatsByMonth} />
      </div>
    </div>
  )
})
