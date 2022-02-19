import React from 'react'
import './movieTable.css'
import { DataGrid } from '@material-ui/data-grid'
import { DeleteOutline } from '@material-ui/icons'
import { Done } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/redux'
import { deleteMovie } from '../../store/reducers/moviesReducer/ActionsCreators'
import { IMovie } from '../../models/IMovie'
import { Add } from '@material-ui/icons'
import { IList } from '../../models/IList'
import { addMovie } from '../../store/reducers/listReducer/ActionsCreators'

interface MovieTableProps {
  movies: Array<IMovie> | null | undefined
  actionType: 'edit' | 'add'
  list?: IList
}

export const MovieTable: React.FC<MovieTableProps> = React.memo(({ movies, actionType, list }) => {
  const dispatch = useAppDispatch()

  const handleDelete = (id: string) => {
    dispatch(deleteMovie(id))
  }
  const handleAddMovie = (id: string) => {
    if (list) {
      dispatch(addMovie({ id, listId: list?._id }))
    }
  }

  const columns = [
    { field: '_id', headerName: 'ID', width: 210 },
    {
      field: 'movie',
      headerName: 'Movie',
      width: 200,
      renderCell: (params: any) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        )
      },
    },
    { field: 'genre', headerName: 'Genre', width: 200 },
    { field: 'year', headerName: 'year', width: 200 },
    { field: 'limit', headerName: 'limit', width: 200 },
    { field: 'isSerial', headerName: 'isSerial', width: 200 },

    {
      field: 'action',
      headerName: 'Action',
      width: 130,
      renderCell: (params: any) => {
        return (
          <>
            {actionType === 'edit' ? (
              <>
                <Link to={{ pathname: '/movie/' + params.row._id, movie: params.row }}>
                  <button className="productListEdit">Edit</button>
                </Link>
                <DeleteOutline
                  className="productListDelete"
                  onClick={() => handleDelete(params.row._id)}
                />
              </>
            ) : list?.content.includes(params.row._id) ? (
              <>
                <Done className="productListDone" />{' '}
                <DeleteOutline
                  className="productListDelete"
                  onClick={() => handleDelete(params.row._id)}
                />
              </>
            ) : (
              <Add onClick={() => handleAddMovie(params.row._id)} />
            )}
          </>
        )
      },
    },
  ]
  return (
    <>
      {movies && (
        <DataGrid
          rows={movies}
          disableSelectionOnClick
          columns={columns}
          pageSize={10}
          checkboxSelection
          getRowId={(r) => r._id}
        />
      )}
    </>
  )
})
