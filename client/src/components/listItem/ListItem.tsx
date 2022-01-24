import React, { useState, useEffect } from 'react'
import './listItem.scss'
import { PlayArrow, Add, ThumbUpAltOutlined, ThumbDownOutlined } from '@material-ui/icons'
import { fetchShowById } from '../../store/reducers/movieReducer/ActionsCreators'
import { IMovie } from '../../models/IMovie'
import { Link } from 'react-router-dom'

interface IListItemProps {
  index: number
  showId: string
}

export const ListItem: React.FC<IListItemProps> = ({ index, showId }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const [show, setShow] = useState<IMovie | null>(null)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    const getShow = async () => {
      try {
        const res = await fetchShowById(showId)
        setShow(res)
      } catch (error) {
        setError(error)
      }
    }
    getShow()
  }, [showId])

  if(error){
    return <div className='listItemError'>{error}</div>
  }
  return (
    //@ts-ignore
    <Link to={{ pathname: '/watch', show: show }}>
      <div
        className="listItem"
        style={{ left: isHovered && ((index * 225 - 50 + index * 2.5) as any) }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        <img src={show?.img} alt="" />
        {isHovered && (
          <>
            <video src={show?.trailer} autoPlay={true} loop />
            <div className="itemInfo">
              <div className="icons">
                <PlayArrow className="icon" />
                <Add className="icon" />
                <ThumbUpAltOutlined className="icon" />
                <ThumbDownOutlined className="icon" />
              </div>
              <div className="itemInfoTop">
                <span>{show?.duration}min</span>
                <span className="limit">+{show?.limit}</span>
                <span>{show?.year}</span>
              </div>
              <div className="desc">{show?.desc}</div>
              <div className="genre">{show?.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  )
}
