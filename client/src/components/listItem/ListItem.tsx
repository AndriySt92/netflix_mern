import React, { useState, useEffect, useRef } from 'react'
import './listItem.scss'
import { fetchShowById } from '../../store/reducers/movieReducer/ActionsCreators'
import { IMovie } from '../../models/IMovie'

interface IListItemProps {
  index: number
  showId?: string
  movie?: IMovie
  active?: boolean
  setClickedMovie?: (show: IMovie) => void
}

export const ListItem: React.FC<IListItemProps> = ({
  active,
  showId,
  movie,
  setClickedMovie,
}) => {
  const [show, setShow] = useState<IMovie | null>(null)
  const [error, setError] = useState<any>(null)
  const [isHovered, setIsHovered] = useState<boolean>(false)

  useEffect(() => {
    if (showId) {
      const getShow = async () => {
        try {
          const res = await fetchShowById(showId)
          setShow(res)
        } catch (error) {
          setError(error)
        }
      }
      getShow()
    } else {
      setShow(movie as IMovie)
    }
  }, [showId, movie])

  if (error) {
    return <div className="listItemError">{error}</div>
  }

  if (!show) {
    return null
  }

  const isSetTransform = isHovered && !active

  if (active && setClickedMovie) {
    setClickedMovie(show)
  }

  return (
    <div
      className={`listItem ${active ? 'active' : ''}`}
      style={{ transform: isSetTransform && ('scale(1.2)' as any) }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <img src={show?.img} alt="" />
    </div>
  )
}
