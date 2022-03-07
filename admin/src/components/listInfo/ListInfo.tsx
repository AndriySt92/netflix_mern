import React from 'react'
import './listInfo.css'
import {InputLabel } from '@mui/material'
import { IList } from '../../models/IList'
import { MovieTable } from '../movieTable/MovieTable'
import { IMovie } from '../../models/IMovie'

interface ListFormProps {
    list: IList
    movies: Array<IMovie> | null | undefined
  }

export const ListInfo: React.FC<ListFormProps> = React.memo(({list, movies}) => {
  return (
    <div style={{height: 'auto'}}>
      <div className="listInfo">
        <div className="listInfoItem">
          <InputLabel htmlFor="title">List title</InputLabel>
          {list.title}
        </div>
        <div className="listInfoItem">
          <InputLabel htmlFor="type">List type</InputLabel>
          {list.type}
        </div>
        <div className="listInfoItem">
          <InputLabel htmlFor="genre">List genre</InputLabel>
          {list.genre}
        </div>
      </div>
      <MovieTable pageSize={10} movies={movies} actionType="edit" list={list} justDisplay={true}  />
    </div>
  )
})
