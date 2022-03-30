import React, { useState } from 'react'
import './movie.scss'
import { IMovie } from '../../models/IMovie'
import AddIcon from '../../images/misc/add.png'
import deleteIcon from '../../images/misc/delete.png'
import { Link, useHistory } from 'react-router-dom'
import { List } from '../list/List'
import { useDispatch } from 'react-redux'
import { closeSearchMovie } from '../../store/reducers/movieReducer/MovieSlice'
import { useAppSelector } from '../../hooks/redux'
import { addMovieToMyList, deleteMovieFromMyList } from '../../store/reducers/authReducer/ActionsCreators'

interface MovieProps {
  movie: IMovie
  offerContent?: Array<IMovie> 
  setClickedMovie?: (movie: null) => void
  setActive?: (index: null) => void
}

export const Movie: React.FC<MovieProps> = ({ movie, offerContent, setClickedMovie, setActive }) => {
  const {user, isUpdating } = useAppSelector(state => state.authReducer)
  const dispatch = useDispatch()
  const history = useHistory()
  const [itemIndex, setItemIndex] = useState<{ currentIndex: number; prevIndex: number }>({
    currentIndex: 0,
    prevIndex: 0,
  })

  const handleCloseMovie = () => {
    if(setActive){
      setActive(null)
      return
    }
    history.push('/')
    dispatch(closeSearchMovie())
  }

  const handleClickMyList = () => {
    if(user){
      if(!user.myList.includes(movie._id)){
        dispatch(addMovieToMyList({movieId: movie._id}))
      } else {
        dispatch(deleteMovieFromMyList({movieId: movie._id}))
      }
    }
  }

  if(!movie) {
    return null
  }
  
  return (
    <div className="movie">
      <h1>Searching movie</h1>
      <div className="movieContent">
        <div className="movieImg">
          <img src={movie.imgTitle} alt="" />
        </div>
        <div className="closeMovie" onClick={handleCloseMovie}>
          <svg viewBox="0 0 26 26" focusable="true">
            <path d="M10.5 9.3L1.8 0.5 0.5 1.8 9.3 10.5 0.5 19.3 1.8 20.5 10.5 11.8 19.3 20.5 20.5 19.3 11.8 10.5 20.5 1.8 19.3 0.5 10.5 9.3Z"></path>
          </svg>
        </div>
        <div className="movieBody">
          <div className="movieTitle">{movie.title}</div>
          <div className="movieRating">
            <div className="rating">
              {itemIndex.currentIndex === 0 && (
                <>
                  {Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <svg key={index} viewBox="0 0 26 26" focusable="true">
                        <path d="M12.9,2.6l2.3,5c0.1,0.3,0.4,0.5,0.7,0.6l5.2,0.8C22,9,22.3,10,21.7,10.6l-3.8,3.9c-0.2,0.2-0.3,0.6-0.3,0.9   l0.9,5.4c0.1,0.8-0.7,1.5-1.4,1.1l-4.7-2.6c-0.3-0.2-0.6-0.2-0.9,0l-4.7,2.6c-0.7,0.4-1.6-0.2-1.4-1.1l0.9-5.4   c0.1-0.3-0.1-0.7-0.3-0.9l-3.8-3.9C1.7,10,2,9,2.8,8.9l5.2-0.8c0.3,0,0.6-0.3,0.7-0.6l2.3-5C11.5,1.8,12.5,1.8,12.9,2.6z" />
                      </svg>
                    ))}
                  <span>{movie.year}</span>
                  <span>TV-SHOW</span>
                </>
              )}
              {itemIndex.currentIndex === 1 && (
                <>
                  {Array(4)
                    .fill(0)
                    .map((_, index) => (
                      <svg key={index} viewBox="0 0 26 26" focusable="true">
                        <path d="M12.9,2.6l2.3,5c0.1,0.3,0.4,0.5,0.7,0.6l5.2,0.8C22,9,22.3,10,21.7,10.6l-3.8,3.9c-0.2,0.2-0.3,0.6-0.3,0.9   l0.9,5.4c0.1,0.8-0.7,1.5-1.4,1.1l-4.7-2.6c-0.3-0.2-0.6-0.2-0.9,0l-4.7,2.6c-0.7,0.4-1.6-0.2-1.4-1.1l0.9-5.4   c0.1-0.3-0.1-0.7-0.3-0.9l-3.8-3.9C1.7,10,2,9,2.8,8.9l5.2-0.8c0.3,0,0.6-0.3,0.7-0.6l2.3-5C11.5,1.8,12.5,1.8,12.9,2.6z" />
                      </svg>
                    ))}
                  <span>IMDb RATING 4/5</span>
                </>
              )}
            </div>
          </div>
          <div className="movieInfo">
            {itemIndex.currentIndex === 0 && (
              <>
                <div>
                  {movie.desc}
                </div>
                <div>
                  <b>GENRE:</b>{movie.genre}
                </div>
                <div>
                  <b>LIMIT:</b>{movie.limit}+
                </div>
                <div>
                  <b>DURATION:</b>{movie.duration} min
                </div>
                <div>
                  <b>ACTORS:</b>John Snow, Marlin Manson, Donald Dack{' '}
                </div>
              </>
            )}
            {itemIndex.currentIndex === 1 && (
              <>
                <div>
                  Aspiring actress serves lattes to movie stars in between auditions and jazz
                  musician Sebastian scrapes by playing cocktail-party gigs in dingy bars. But as
                  success mounts, they are faced with decisions that fray the fragile fabric of
                  their love affair, and the dreams they worked so hard to maintain in each other
                  threaten to rip them apart.—Eirini
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
                <div>
                  <b>ACTORS:</b>John Snow, Marlin Manson, Donald Dack{' '}
                </div>
              </>
            )}
            <div onClick={handleClickMyList} className={isUpdating ? 'disable' : ''}>
              {!user?.myList.includes(movie._id) && <><img src={AddIcon} alt="" /> MY LIST </>}
              {user?.myList.includes(movie._id) && <><img src={deleteIcon} alt=""  /> MY LIST </>}
            </div>
          </div>
        </div>
        <div className="movieMenu">
          {['Overview', 'Details', 'Trailers', 'Movie'].map((item, index) => {
            if (item === 'Trailers') {
              return (
                //@ts-ignore
                <Link to={{ pathname: '/watch', show: movie.trailer }}>{item}</Link>
              )
            }

            if (item === 'Movie') {
              return (
                //@ts-ignore
                <Link to={{ pathname: '/watch', show: movie.video }}>{item}</Link>
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
      <h1>What else to watch on netflix</h1>
      <List content={offerContent} /> 
    </div>
  )
}
