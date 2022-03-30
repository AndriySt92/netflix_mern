import React, { useRef, useState } from 'react'
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@material-ui/icons'
import { ListItem } from '../listItem/ListItem'
import './list.scss'
import { IList } from '../../models/IList'
import { IMovie } from '../../models/IMovie'
import { Movie } from '../movie/Movie'

interface ListProps {
  list?: IList
  content?: Array<IMovie>
  title? : string
}

export const List: React.FC<ListProps> = ({ list, content, title }) => {
  const [isMovedLeft, setIsMovedLeft] = useState<boolean>(false)
  const [isMovedRight, setIsMovedRight] = useState<boolean>(true)
  const [slideNumber, setSlideNumber] = useState<number>(0)
  const [active, setActive] = useState<number | null>(null)
  const [clickedMovie, setClickedMovie] = useState<IMovie | null>(null)
  const listRef = useRef<any>()
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
 
  console.log(clickedMovie)
  return (
    <div className="list">
      {list && <span className="listTitle">{list.title}</span>}
      {title&& <span className="listTitle">{title}</span>}
      <div className="wrapper">
        <ArrowBackIosOutlined
          className="sliderArrow left"
          onClick={() => handleClick('left')}
          style={{ display: !isMovedLeft && ('none' as any) }}
        />
        <div className="container" ref={listRef}>
          {list && list.content.map((showId, i) => (
            <div onClick={() => setActive(i)} >
              <ListItem index={i} key={`${showId}${i}`} showId={showId} active = {active === i} setClickedMovie = {setClickedMovie} />
            </div>
          ))}
          {content && content.map((show, i) => (
            <ListItem index={i} key={i} movie={show} />
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
