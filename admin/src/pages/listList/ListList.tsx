import React, { useEffect } from 'react'
import './listList.css'
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

export const ListList: React.FC = () => {
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
        return <div className="productListItem">{params.row.title}</div>
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
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        )
      },
    },
  ]
  debugger
  return (
    <div className="productList">
      <DataGrid
        rows={lists}
        disableSelectionOnClick
        columns={columns}
        pageSize={14}
        checkboxSelection
        getRowId={(r) => r._id}
      />
    </div>
  )
}
