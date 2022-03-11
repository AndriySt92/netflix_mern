import React from 'react'
import { InfoOutlined, PlayArrow } from '@material-ui/icons'
import './featured.scss'
import { IMovie } from '../../models/IMovie'

interface FeaturedProps {
  type: 'serial' | 'movie'
  movie: IMovie
  setGenre: (genre: string) => void
}
export const Featured: React.FC<FeaturedProps> = ({ type = 'movie', movie, setGenre }) => {
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
          <button className="play">
            <PlayArrow />
            <span>Play</span>
          </button>
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  )
}
