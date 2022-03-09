import React from 'react'
import './usersTable.css'
import { DataGrid } from '@material-ui/data-grid'
import { DeleteOutline } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/redux'
import { deleteUser } from '../../store/reducers/usersReducer/ActionsCreators'
import { formatDate } from '../../helpers/formatDate'
import { IUser } from '../../models/IUser'

interface UsersTableProps {
  pageSize: number
  withoutAction?: boolean
  users: Array<IUser> | null | undefined
}

export const UsersTable: React.FC<UsersTableProps> = React.memo(({ pageSize, withoutAction, users }) => {
  const dispatch = useAppDispatch()
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
            <DeleteOutline
              className="usersTableDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        )
      },
    },
  ]

  if (withoutAction) {
    columns.splice(5, 1)
  }

  return (
    <div className="usersTable">
      {users && users.length > 0 ? (
        <DataGrid
          rows={users}
          disableSelectionOnClick
          columns={columns}
          pageSize={pageSize}
          checkboxSelection
          getRowId={(r) => r._id}
        />
      ) : (
        <div className="noContent">No Users</div>
      )}
    </div>
  )
})
