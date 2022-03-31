import React, { useState } from 'react'
import { InfoOutlined, PlayArrow } from '@material-ui/icons'
import './featured.scss'
import { IMovie } from '../../models/IMovie'
import { Link } from 'react-router-dom'

interface FeaturedProps {
  type: 'serial' | 'movie'
  movie: IMovie
  setGenre: (genre: string) => void
}
export const Featured: React.FC<FeaturedProps> = ({ type = 'movie', movie, setGenre }) => {
  const [activeInfo, setActiveInfo] = useState<boolean>(false)

  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === 'movie' ? 'Movies' : 'Series'}</span>
          <select name="genre" id="genre" onChange={(e) => setGenre(e.target.value)}>
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
      <img src={movie?.img} alt="" />
      <div className="info">
        <h1>Watch {movie?.title} Now</h1>
        <span className="desc">{movie?.desc}</span>
        <div className="buttons">
          {
            //@ts-ignore
            <Link to={{ pathname: '/watch', show: movie?.trailer }}>
              <button className="play">
                <PlayArrow />
                <span>Play</span>
              </button>
            </Link>
          }
          <button className="more" onClick={() => setActiveInfo(true)}>
            <InfoOutlined onClick={() => setActiveInfo(true)} />
            <span onClick={() => setActiveInfo(true)}>Info</span>
          </button>
        </div>
        <div className={`movieInfoModal ${activeInfo ? 'active' : ''}`}>
          <svg viewBox="0 0 26 26" focusable="true" onClick={() => setActiveInfo(false)}>
            <path d="M10.5 9.3L1.8 0.5 0.5 1.8 9.3 10.5 0.5 19.3 1.8 20.5 10.5 11.8 19.3 20.5 20.5 19.3 11.8 10.5 20.5 1.8 19.3 0.5 10.5 9.3Z"></path>
          </svg>
          <div>
            <b>GENRE:</b>
            {movie?.genre}
          </div>
          <div>
            <b>LIMIT:</b>
            {movie?.limit}+
          </div>
          <div>
            <b>DURATION:</b>
            {movie?.duration} min
          </div>
          <div>
            <b>ACTORS:</b>John Snow, Marlin Manson, Donald Dack{' '}
          </div>
          <div>
            <b>DIRECTOR:</b>Damien Chazelle
          </div>
          <div>
            <b>WRITER:</b>Damien Chazelle
          </div>
          <div>
            <b>PRODUCERS:</b>Fred Berger,Jordan Horowitz,Gary Gilbert,Marc Platt
          </div>
        </div>
      </div>
    </div>
  )
}
