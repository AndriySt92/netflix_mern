import React, { useEffect } from 'react'
import './list.css'
import { Link, useParams } from 'react-router-dom'
import { clear } from '../../store/reducers/usersReducer/UsersSlice'
import { useAppDispatch } from '../../hooks/redux'
import { useAppSelector } from '../../hooks/redux'
import { fetchList } from '../../store/reducers/listReducer/ActionsCreators'
import { Preloader } from '../../components/preloader/Preloader'
import { Button } from '@mui/material'
import { ListForm } from '../../components/listForm/ListForm'
import { Error } from '../../components/error/Error'
import { ListInfo } from '../../components/listInfo/ListInfo'
import { fetchMovie } from '../../store/reducers/listReducer/ActionsCreators'

export const List: React.FC = () => {
  const {
    list,
    error,
    isLoading,
    listMovies,
  } = useAppSelector((state) => state.listsReducer)
  const dispatch = useAppDispatch()
  const { listId } = useParams<{ listId: string }>()

  useEffect(() => {
    dispatch(fetchList(listId))
    return () => {
      dispatch(clear())
    }
  }, [])

  useEffect(() => {
    if (list) {
      if(listMovies.length === list.content.length ) return 
      list.content.forEach((id) => dispatch(fetchMovie(id)))
    }
  }, [list])

  if (error) {
    return <Error error={error} />
  }

  if (isLoading || !list) {
    return <Preloader />
  }

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Update list</h1>
        <Link to="/newMovie">
          <Button variant="contained">Create</Button>
        </Link>
      </div>
      <div className="productTop">
        <ListForm text="update" list={list}/>
      </div>
      <div className="productBottom">
        <ListInfo list={list} movies={listMovies} />
      </div>
    </div>
  )
}
