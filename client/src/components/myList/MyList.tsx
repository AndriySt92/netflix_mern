import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { IMovie } from '../../models/IMovie'
import { fetchMyList } from '../../store/reducers/ListsReducer/ActionsCreators'
import { List } from '../list/List'

interface myListProps {
  myList: Array<IMovie>
}

export const MyList: React.FC<myListProps> = ({myList}) => {
  const { user } = useAppSelector((state) => state.authReducer)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (user?.myList.length === myList.length) return
    user?.myList.forEach((movieId) => {
      dispatch(fetchMyList(movieId))
    })
  }, [])

  if(!user?.myList.length) {
    return <div style={{margin: '20px', textAlign:'center', color: 'white', fontSize: '20px'}}>You haven't any content in your list </div>
  }

  return (
    <div>
      <List title="My List" content={myList} />
    </div>
  )
}
