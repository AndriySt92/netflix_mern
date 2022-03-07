import React, { useEffect } from 'react'
import './listsTable.css'
import { DataGrid } from '@material-ui/data-grid'
import { DeleteOutline } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/redux'
import { useAppSelector } from '../../hooks/redux'
import { clear } from '../../store/reducers/usersReducer/UsersSlice'
import { Preloader } from '../../components/preloader/Preloader'
import { Error } from '../../components/error/Error'
import { deleteList, fetchLists } from '../../store/reducers/listReducer/ActionsCreators'
import { formatDate } from '../../helpers/formatDate'

interface ListTableProps {
  pageSize: number
}

export const ListTable: React.FC<ListTableProps> = ({ pageSize }) => {
  const { lists, error, isLoading } = useAppSelector((state) => state.listsReducer)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchLists())
    return () => {
      dispatch(clear())
    }
  }, [])

  const handleDelete = (id: string) => {
    dispatch(deleteList(id))
  }

  if (error) {
    return <Error error={error} />
  }

  if (isLoading || !lists) {
    return <Preloader />
  }

  const columns = [
    { field: '_id', headerName: 'ID', width: 210 },
    {
      field: 'list',
      headerName: 'List',
      width: 200,
      renderCell: (params: any) => {
        return <div className="listsTableItem">{params.row.title}</div>
      },
    },
    { field: 'genre', headerName: 'Genre', width: 200 },
    { field: 'type', headerName: 'Type', width: 200 },
    {
      field: 'createdAt',
      headerName: 'Creation date',
      width: 200,
      renderCell: (params: any) => {
        return <div>{formatDate(params.row.createdAt)}</div>
      },
    },
    {
      field: 'updatedAt',
      headerName: 'Updation date',
      width: 200,
      renderCell: (params: any) => {
        return <div>{formatDate(params.row.updatedAt)}</div>
      },
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 120,
      renderCell: (params: any) => {
        return (
          <>
            <Link to={{ pathname: '/list/' + params.row._id, lists: params.row }}>
              <button className="listsTableEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="listsTableDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        )
      },
    },
  ]

  return (
    <div className="listsTable">
      <DataGrid
        rows={lists}
        disableSelectionOnClick
        columns={columns}
        pageSize={pageSize}
        checkboxSelection
        getRowId={(r) => r._id}
      />
    </div>
  )
}
