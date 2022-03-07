import React, { useEffect, useState } from 'react'
import './usersTable.css'
import { DataGrid } from '@material-ui/data-grid'
import { DeleteOutline } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/redux'
import { useAppSelector } from '../../hooks/redux'
import { deleteUser, getUsers } from '../../store/reducers/usersReducer/ActionsCreators'
import { formatDate } from '../../helpers/formatDate'
import { clear } from '../../store/reducers/usersReducer/UsersSlice'
import { Preloader } from '../../components/preloader/Preloader'
import { Error } from '../../components/error/Error'

interface UsersTableProps {
    pageSize: number
}

export const UsersTable: React.FC<UsersTableProps> = ({pageSize}) => {
  const { users, error, isLoading } = useAppSelector((state) => state.usersReducer)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getUsers())
    return () => {
      dispatch(clear())
    }
  }, [])

  const handleDelete = (id: string) => {
    dispatch(deleteUser(id))
  }

  const columns = [
    { field: '_id', headerName: 'ID', width: 250 },
    {
      field: 'user',
      headerName: 'User',
      width: 250,
      renderCell: (params: any) => {
        return <div className="usersTableUser">{params.row.username}</div>
      },
    },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'createdAt',
      headerName: 'Creation date',
      width: 250,
      renderCell: (params: any) => {
        return <div>{formatDate(params.row.createdAt)}</div>
      },
    },
    {
      field: 'updatedAt',
      headerName: 'Updation date',
      width: 250,
      renderCell: (params: any) => {
        return <div>{formatDate(params.row.updatedAt)}</div>
      },
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 130,
      renderCell: (params: any) => {
        return (
          <>
            <Link to={'/user/' + params.row.id}>
              <button className="usersTableEdit">Edit</button>
            </Link>
            <DeleteOutline className="usersTableDelete" onClick={() => handleDelete(params.row.id)} />
          </>
        )
      },
    },
  ]

  if (error) {
    return <Error error={error}/>
  }

  if (isLoading || !users) {
    return <Preloader />
  }

  return (
    <div className="usersTable">
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        pageSize={pageSize}
        checkboxSelection
      />
    </div>
  )
}
