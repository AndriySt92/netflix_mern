import React from 'react'
import { ArrowBackOutlined} from '@material-ui/icons'
import './watch.scss'
import { Link, useLocation } from 'react-router-dom'
import { IMovie } from '../../models/IMovie'
export const Watch = () => {
  const location = useLocation()
  //@ts-ignore
  const show: IMovie = location.show

  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <ArrowBackOutlined />
          Home
        </div>
      </Link>
      <video className="video" autoPlay controls src={show.video}></video>
    </div>
  )
}
