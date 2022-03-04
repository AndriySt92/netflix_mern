import React, { useEffect, useState } from 'react'
import './addList.css'
import { ListForm } from '../../components/listForm/ListForm'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { IList } from '../../models/IList'
import { Alert, MenuItem, TextareaAutosize } from '@mui/material'
import { InputLabel, Snackbar, TextField } from '@material-ui/core'
import { clear, clearSuccess } from '../../store/reducers/listReducer/ListsSlice'
import { Error } from '../../components/error/Error'
import { Preloader } from '../../components/preloader/Preloader'

export const AddList = () => {
  const dispatch = useAppDispatch()
  const { list, error, isLoading, isSuccess } = useAppSelector((state) => state.listsReducer)
  const [open, setOpen] = useState<boolean>(true)

  useEffect(() => {
    if (isSuccess === true) {
      setOpen(true)
      setTimeout(() => {
        dispatch(clearSuccess())
      }, 3000)
    } else {
      setOpen(false)
    }
  }, [isSuccess])

  return (
    <>
      <div className="addList">
        <ListForm text="create" list={list as IList} />
        {isLoading && <Preloader/>}
        {error && <Error error={error}/>}
      </div>{' '}
      <Snackbar open={open} autoHideDuration={6000}>
        <Alert severity="success" sx={{ width: '100%' }}>
          List {list?.title} was created successfull. You can add movie to created list
        </Alert>
      </Snackbar>
    </>
  )
}
