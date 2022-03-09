import React, { useEffect } from 'react'
import './usersList.css'
import { UsersTable } from '../../components/usersTable/UsersTable'
import { Error } from '../../components/error/Error'
import { Preloader } from '../../components/preloader/Preloader'
import { getUsers } from '../../store/reducers/usersReducer/ActionsCreators'
import { clear } from '../../store/reducers/usersReducer/UsersSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'

export const UserList: React.FC = () => {
  const { users, error, isLoading } = useAppSelector((state) => state.usersReducer)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getUsers())
    return () => {
      dispatch(clear())
    }
  }, [])


  if (error) {
    return <Error error={error}/>
  }

  if (isLoading || !users) {
    return <Preloader />
  }

  return (
    <div className="userList">
      <UsersTable pageSize={15} users={users} />
    </div>
  )
}
