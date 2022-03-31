import React, { useEffect, useRef, useState } from 'react'
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@material-ui/icons'
import { ListItem } from '../listItem/ListItem'
import './list.scss'
import { IList } from '../../models/IList'
import { IMovie } from '../../models/IMovie'
import { Movie } from '../movie/Movie'
import { fetchShowById } from '../../store/reducers/movieReducer/ActionsCreators'
import { Error } from '../error/Error'
import { Loading } from '../Loading/Loading'

interface ListProps {
  list?: IList
  content?: Array<IMovie>
  title?: string
}

export const List: React.FC<ListProps> = ({ list, content, title }) => {
  const [isMovedLeft, setIsMovedLeft] = useState<boolean>(false)
  const [isMovedRight, setIsMovedRight] = useState<boolean>(true)
  const [slideNumber, setSlideNumber] = useState<number>(0)
  const [active, setActive] = useState<number | null>(null)
  const [clickedMovie, setClickedMovie] = useState<IMovie | null>(null)
  const [shows, setShows] = useState<Array<IMovie>>([])
  const [error, setError] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const listRef = useRef<any>()

  useEffect(() => {
    setIsLoading(true)
    const getShows = () => {
      list?.content.map(async (movieId) => {
        try {
          const res = await fetchShowById(movieId)
          setShows((prev) => [...prev, res])
        } catch (error) {
          setError(error)
        }
      })
    }
    getShows()
    setIsLoading(false)
  }, [])

  const clickLimit: number =
    Math.ceil(listRef.current?.clientWidth / 230) - Math.floor(window.innerWidth / 230)

  const handleClick = (direction: string) => {
    let distance = listRef.current?.getBoundingClientRect().x - 50

    setIsMovedLeft(true)
    if (direction === 'left' && slideNumber > 0) {
      setIsMovedRight(true)
      setSlideNumber(slideNumber - 1)
      listRef.current.style.transform = `translateX(${230 + distance}px)`

      if (slideNumber - 1 == 0) {
        setIsMovedLeft(false)
      }
    }
    if (direction === 'right' && slideNumber < clickLimit) {
      setIsMovedLeft(true)
      setSlideNumber(slideNumber + 1)
      listRef.current.style.transform = `translateX(${-230 + distance}px)`

      if (slideNumber + 1 == clickLimit) {
        setIsMovedRight(false)
      }
    }
  }

  if (error) {
    return <Error error={error} />
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="list">
      {list && <span className="listTitle">{list.title}</span>}
      {title && <span className="listTitle">{title}</span>}
      <div className="wrapper">
        <ArrowBackIosOutlined
          className="sliderArrow left"
          onClick={() => handleClick('left')}
          style={{ display: !isMovedLeft && ('none' as any) }}
        />
        <div className="container" ref={listRef}>
          {shows.length &&
            shows.map((show, i) => (
              <div onClick={() => setActive(i)}>
                <ListItem
                  key={`${show}${i}`}
                  movie={show}
                  active={active === i}
                  setClickedMovie={setClickedMovie}
                />
              </div>
            ))}
          {content &&
            content.map((show, i) => (
              <div onClick={() => setActive(i)}>
                <ListItem
                  key={i}
                  movie={show}
                  active={active === i}
                  setClickedMovie={setClickedMovie}
                />
              </div>
            ))}
        </div>
        <ArrowForwardIosOutlined
          className="sliderArrow right"
          onClick={() => handleClick('right')}
          style={{ display: !isMovedRight && ('none' as any) }}
        />
      </div>
      <div className={`listClickedMovie ${active || active === 0 ? 'active' : 'close'}`}>
        <Movie movie={clickedMovie as IMovie} setActive={setActive} />
      </div>
    </div>
  )
}
