import React from 'react'
import './listsTable.css'
import { DataGrid } from '@material-ui/data-grid'
import { DeleteOutline } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/redux'
import { deleteList } from '../../store/reducers/listReducer/ActionsCreators'
import { formatDate } from '../../helpers/formatDate'
import { IList } from '../../models/IList'

interface ListTableProps {
  pageSize: number
  withoutAction?: boolean
  lists: Array<IList> | null | undefined
}

export const ListTable: React.FC<ListTableProps> = React.memo(({ pageSize, withoutAction, lists }) => {
  const dispatch = useAppDispatch()
  const handleDelete = (id: string) => {
    dispatch(deleteList(id))
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

  if(withoutAction){
    columns.splice(6,1)
  }

  return (
    <div className="listsTable">
     {lists && lists.length > 0 ? (
        <DataGrid
          rows={lists}
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
