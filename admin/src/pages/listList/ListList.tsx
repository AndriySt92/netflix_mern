import React, { useEffect } from 'react'
import './listList.css'
import { useAppDispatch } from '../../hooks/redux'
import { useAppSelector } from '../../hooks/redux'
import { clear } from '../../store/reducers/usersReducer/UsersSlice'
import { Preloader } from '../../components/preloader/Preloader'
import { Error } from '../../components/error/Error'
import { fetchLists } from '../../store/reducers/listReducer/ActionsCreators'
import { ListTable } from '../../components/listsTable/ListsTable'

export const ListList: React.FC = () => {

  const { lists, error, isLoading } = useAppSelector((state) => state.listsReducer)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchLists())
    return () => {
      dispatch(clear())
    }
  }, [])

  if (error) {
    return <Error error={error} />
  }

  if (isLoading) {
    return <Preloader />
  }
 
  return (
    <div className="listList">
      <ListTable pageSize={15} lists={lists} />
    </div>
  )
}
