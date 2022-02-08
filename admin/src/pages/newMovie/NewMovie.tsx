import React from 'react'
import './newMovie.css'
import { MovieForm } from '../../components/movieForm/MovieForm'

export const NewMovie: React.FC = () => {
  return (
    <div className="newProduct">
      <h1 className="newProductTitle">New Movie</h1>
        <MovieForm text="create" />
    </div>
  )
}
