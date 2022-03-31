import React, { useState, useEffect, useRef } from 'react'
import './listItem.scss'
import { fetchShowById } from '../../store/reducers/movieReducer/ActionsCreators'
import { IMovie } from '../../models/IMovie'

interface IListItemProps {
  movie: IMovie
  active?: boolean
  setClickedMovie?: (show: IMovie) => void
}

export const ListItem: React.FC<IListItemProps> = ({
  active,
  movie,
  setClickedMovie,
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const isSetTransform = isHovered && !active

  if (active && setClickedMovie) {
    setClickedMovie(movie)
  }

  return (
    <div
      className={`listItem ${active ? 'active' : ''}`}
      style={{ transform: isSetTransform && ('scale(1.2)' as any), position: isSetTransform && ('relative' as any), zIndex: isSetTransform && (100 as any) }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <img src={movie?.img} alt="" />
    </div>
  )
}
