import React, { useState } from 'react'
import './movie.scss'
import { IMovie } from '../../models/IMovie'
import imgTitle from '../../images/films/romance/la-la-land/large.jpg'
import AddIcon from '../../images/misc/add.png'
import { current } from '@reduxjs/toolkit'
import { Link } from 'react-router-dom'

interface MovieProps {
  movie: IMovie | string
}

export const Movie: React.FC<MovieProps> = ({movie}) => {
  const [itemIndex, setItemIndex] = useState<{ currentIndex: number; prevIndex: number }>({
    currentIndex: 0,
    prevIndex: 0,
  })
  if(typeof movie === 'string') return <div className='notFoundMovie'>{movie}</div>
 
  return (
    <div className="movie">
      <h1>Searching movie</h1>
      <div className="movieContent">
        <div className="movieImg">
          <img src={imgTitle} alt="" />
        </div>
        <div className="closeMovie">
          <svg viewBox="0 0 26 26" focusable="true">
            <path d="M10.5 9.3L1.8 0.5 0.5 1.8 9.3 10.5 0.5 19.3 1.8 20.5 10.5 11.8 19.3 20.5 20.5 19.3 11.8 10.5 20.5 1.8 19.3 0.5 10.5 9.3Z"></path>
          </svg>
        </div>
        <div className="movieBody">
          <div className="movieTitle">la-la-land</div>
          <div className="movieRating">
            <div className="rating">
              <svg viewBox="0 0 26 26" focusable="true">
                <path d="M12.9,2.6l2.3,5c0.1,0.3,0.4,0.5,0.7,0.6l5.2,0.8C22,9,22.3,10,21.7,10.6l-3.8,3.9c-0.2,0.2-0.3,0.6-0.3,0.9   l0.9,5.4c0.1,0.8-0.7,1.5-1.4,1.1l-4.7-2.6c-0.3-0.2-0.6-0.2-0.9,0l-4.7,2.6c-0.7,0.4-1.6-0.2-1.4-1.1l0.9-5.4   c0.1-0.3-0.1-0.7-0.3-0.9l-3.8-3.9C1.7,10,2,9,2.8,8.9l5.2-0.8c0.3,0,0.6-0.3,0.7-0.6l2.3-5C11.5,1.8,12.5,1.8,12.9,2.6z" />
              </svg>
              <svg viewBox="0 0 26 26" focusable="true">
                <path d="M12.9,2.6l2.3,5c0.1,0.3,0.4,0.5,0.7,0.6l5.2,0.8C22,9,22.3,10,21.7,10.6l-3.8,3.9c-0.2,0.2-0.3,0.6-0.3,0.9   l0.9,5.4c0.1,0.8-0.7,1.5-1.4,1.1l-4.7-2.6c-0.3-0.2-0.6-0.2-0.9,0l-4.7,2.6c-0.7,0.4-1.6-0.2-1.4-1.1l0.9-5.4   c0.1-0.3-0.1-0.7-0.3-0.9l-3.8-3.9C1.7,10,2,9,2.8,8.9l5.2-0.8c0.3,0,0.6-0.3,0.7-0.6l2.3-5C11.5,1.8,12.5,1.8,12.9,2.6z" />
              </svg>
              <svg viewBox="0 0 26 26" focusable="true">
                <path d="M12.9,2.6l2.3,5c0.1,0.3,0.4,0.5,0.7,0.6l5.2,0.8C22,9,22.3,10,21.7,10.6l-3.8,3.9c-0.2,0.2-0.3,0.6-0.3,0.9   l0.9,5.4c0.1,0.8-0.7,1.5-1.4,1.1l-4.7-2.6c-0.3-0.2-0.6-0.2-0.9,0l-4.7,2.6c-0.7,0.4-1.6-0.2-1.4-1.1l0.9-5.4   c0.1-0.3-0.1-0.7-0.3-0.9l-3.8-3.9C1.7,10,2,9,2.8,8.9l5.2-0.8c0.3,0,0.6-0.3,0.7-0.6l2.3-5C11.5,1.8,12.5,1.8,12.9,2.6z" />
              </svg>
              <svg viewBox="0 0 26 26" focusable="true">
                <path d="M12.9,2.6l2.3,5c0.1,0.3,0.4,0.5,0.7,0.6l5.2,0.8C22,9,22.3,10,21.7,10.6l-3.8,3.9c-0.2,0.2-0.3,0.6-0.3,0.9   l0.9,5.4c0.1,0.8-0.7,1.5-1.4,1.1l-4.7-2.6c-0.3-0.2-0.6-0.2-0.9,0l-4.7,2.6c-0.7,0.4-1.6-0.2-1.4-1.1l0.9-5.4   c0.1-0.3-0.1-0.7-0.3-0.9l-3.8-3.9C1.7,10,2,9,2.8,8.9l5.2-0.8c0.3,0,0.6-0.3,0.7-0.6l2.3-5C11.5,1.8,12.5,1.8,12.9,2.6z" />
              </svg>
              <svg viewBox="0 0 26 26" focusable="true">
                <path d="M12.9,2.6l2.3,5c0.1,0.3,0.4,0.5,0.7,0.6l5.2,0.8C22,9,22.3,10,21.7,10.6l-3.8,3.9c-0.2,0.2-0.3,0.6-0.3,0.9   l0.9,5.4c0.1,0.8-0.7,1.5-1.4,1.1l-4.7-2.6c-0.3-0.2-0.6-0.2-0.9,0l-4.7,2.6c-0.7,0.4-1.6-0.2-1.4-1.1l0.9-5.4   c0.1-0.3-0.1-0.7-0.3-0.9l-3.8-3.9C1.7,10,2,9,2.8,8.9l5.2-0.8c0.3,0,0.6-0.3,0.7-0.6l2.3-5C11.5,1.8,12.5,1.8,12.9,2.6z" />
              </svg>
              <span>2015</span>
              <span>TV-SHOW</span>
            </div>
          </div>
          <div className="movieInfo">
            <div>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non assumenda incidunt
              repellendus cupiditate voluptas possimus, accusamus iure fuga unde, quaerat totam
              porro similique aliquid alias, odio illo. Beatae, cumque voluptates?
            </div>
            <div>
              <b>GENRE:</b>Action
            </div>
            <div>
              <b>LIMIT:</b>18+
            </div>
            <div>
              <b>DURATION:</b>129 min
            </div>
            <div>
              <b>ACTORS:</b>John Snow, Marlin Manson, Donald Dack{' '}
            </div>
            <div>
              <img src={AddIcon} alt="" /> MY LIST
            </div>
          </div>
        </div>
        <div className="movieMenu">
          {['Overview', 'Trailers', 'Movie', 'Details'].map((item, index) => {

            if(item === 'Trailers'){
              return (
                <div
                className={
                  itemIndex.currentIndex === index
                    ? itemIndex.currentIndex <= itemIndex.prevIndex
                      ? 'slide-left'
                      : 'slide-right'
                    : ''
                }
                onClick={() =>
                  setItemIndex((prev) => ({ currentIndex: index, prevIndex: prev.currentIndex }))
                }>
                {item}
              </div>
              )
            }

            if(item === 'Movie'){
              return (
                <div
                className={
                  itemIndex.currentIndex === index
                    ? itemIndex.currentIndex <= itemIndex.prevIndex
                      ? 'slide-left'
                      : 'slide-right'
                    : ''
                }
                onClick={() =>
                  setItemIndex((prev) => ({ currentIndex: index, prevIndex: prev.currentIndex }))
                }>
                <Link to=''>{item}</Link>
              </div>
              )
            }
            return (
              <div
                className={
                  itemIndex.currentIndex === index
                    ? itemIndex.currentIndex <= itemIndex.prevIndex
                      ? 'slide-left'
                      : 'slide-right'
                    : ''
                }
                onClick={() =>
                  setItemIndex((prev) => ({ currentIndex: index, prevIndex: prev.currentIndex }))
                }>
                {item}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
