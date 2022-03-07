import React, { useEffect } from 'react'
import './listList.css'
import { DataGrid } from '@material-ui/data-grid'
import { DeleteOutline } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/redux'
import { useAppSelector } from '../../hooks/redux'
import { clear } from '../../store/reducers/usersReducer/UsersSlice'
import { Preloader } from '../../components/preloader/Preloader'
import { Error } from '../../components/error/Error'
import { deleteList, fetchLists } from '../../store/reducers/listReducer/ActionsCreators'
import { formatDate } from '../../helpers/formatDate'
import { ListTable } from '../../components/listsTable/ListsTable'

export const ListList: React.FC = () => {
 
  return (
    <div className="listList">
      <ListTable pageSize={15} />
    </div>
  )
}
