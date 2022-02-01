import React, { useEffect } from "react";
import "./movieList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useAppDispatch } from '../../hooks/redux'
import { useAppSelector } from '../../hooks/redux'
import {deleteMovie, fetchMovies} from '../../store/reducers/moviesReducer/ActionsCreators';
import { formatDate } from '../../helpers/formatDate'
import { clear } from '../../store/reducers/usersReducer/UsersSlice'
import { Preloader } from '../../components/preloader/Preloader'
import { Error } from '../../components/error/Error'


export const MovieList: React.FC = () => {
    const { movies, error, isLoading } = useAppSelector((state) => state.moviesReducer)
    const dispatch = useAppDispatch()
  
    useEffect(() => {
      dispatch(fetchMovies())
      return () => {
        dispatch(clear())
      }
    }, [])
  
    const handleDelete = (id: string) => {
      dispatch(deleteMovie(id))
    }

    if (error) {
        return <Error error={error}/>
      }
    
      if (isLoading || !movies) {
        return <Preloader />
      }
  
  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "movie",
      headerName: "Movie",
      width: 200,
      renderCell: (params: any) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "genre", headerName: "Genre", width: 200 },
    { field: "year", headerName: "year", width: 200 },
    { field: "limit", headerName: "limit", width: 200 },
    { field: "isSeries", headerName: "isSeries", width: 200 },

    {
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (params: any) => {
        return (
          <>
            <Link
              to={{ pathname: "/movie/" + params.row._id, movie: params.row }}
            >
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ]

  return (
    <div className="productList">
      <DataGrid
        rows={movies}
        disableSelectionOnClick
        columns={columns}
        pageSize={14}
        checkboxSelection
        getRowId={(r) => r._id}
      />
    </div>
  );
}