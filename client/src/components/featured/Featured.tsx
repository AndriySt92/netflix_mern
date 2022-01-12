import React from 'react'
import { InfoOutlined, PlayArrow } from '@material-ui/icons'
import poster from '../../images/misc/joker1.jpg'
import './featured.scss'

interface IFeaturedProps{
    type: 'serial' | 'movie'
}
export const Featured: React.FC<IFeaturedProps> = ({ type }) => {
  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === 'movie' ? 'Movies' : 'Series'}</span>
          <select name="genre" id="genre">
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
      <img src={poster} alt="" />
      <div className="info">
        <h1>Watch Joker Now</h1>
        <span className="desc">
          In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by
          society. He then embarks on a downward spiral of revolution and bloody crime. This path
          brings him face-to-face with his alter-ego: the Joker.
        </span>
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
