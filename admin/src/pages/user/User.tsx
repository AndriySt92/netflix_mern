import React, { useEffect } from 'react'
import './user.css'
import { Publish } from '@material-ui/icons'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import { Link, useParams } from 'react-router-dom'
import { clear } from '../../store/reducers/usersReducer/UsersSlice'
import { useAppDispatch } from '../../hooks/redux'
import { useAppSelector } from '../../hooks/redux'
import { getUser } from '../../store/reducers/usersReducer/ActionsCreators'
import { Preloader } from '../../components/preloader/Preloader'
import { formatDate } from '../../helpers/formatDate'
import { updateUser } from '../../store/reducers/usersReducer/ActionsCreators'

interface UpdateDate {
  email: string
  username: string
  fullname: string
  phone: string
}

export default function User() {
  const [formData, setFormData] = React.useState<UpdateDate>({
    email: '',
    username: '',
    fullname: '',
    phone: '',
  })
  const { user, error, isLoading, isSuccess } = useAppSelector((state) => state.usersReducer)
  const dispatch = useAppDispatch()
  const { userId } = useParams<{ userId: string }>()

  useEffect(() => {
    dispatch(getUser(userId))
    return () => {
        dispatch(clear())
      }
  }, [])
  
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const updateHandler = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    //@ts-ignore
    dispatch(updateUser({ ...formData, _id: userId }))
  }

  if (isLoading || !user) {
    return <Preloader />
  }

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user?.username}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <span>
                <b>User ID:</b>
              </span>
              <span className="userShowInfoTitle">{user?._id}</span>
            </div>
            <div className="userShowInfo">
              <span>
                <b>Full name:</b>
              </span>
              {user.fullname ? (
                <span className="userShowInfoTitle">{user?.fullname}</span>
              ) : (
                <span className="userShowInfoTitle">Information not specified</span>
              )}
            </div>
            <div className="userShowInfo">
              <span>
                <b>Username:</b>
              </span>
              <span className="userShowInfoTitle">{user?.username}</span>
            </div>
            <div className="userShowInfo">
              <span>
                <b>Gender:</b>
              </span>
              {user.gender ? (
                <span className="userShowInfoTitle">{user?.gender}</span>
              ) : (
                <span className="userShowInfoTitle">Information not specified</span>
              )}
            </div>
            <div className="userShowInfo">
              <span>
                <b>Birthdate:</b>
              </span>
              {user.birthdate ? (
                <span className="userShowInfoTitle">{user?.birthdate}</span>
              ) : (
                <span className="userShowInfoTitle">Information not specified</span>
              )}
            </div>
            <div className="userShowInfo">
              <span>
                <b>Created at:</b>
              </span>
              <span className="userShowInfoTitle">{formatDate(user?.createdAt)}</span>
            </div>
            <div className="userShowInfo">
              <span>
                <b>Updated at:</b>
              </span>
              <span className="userShowInfoTitle">{formatDate(user?.updatedAt)}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <span>
                <b>Phone number:</b>
              </span>
              {user.phone ? (
                <span className="userShowInfoTitle">{user.phone}</span>
              ) : (
                <span className="userShowInfoTitle">Information not specified</span>
              )}
            </div>
            <div className="userShowInfo">
              <span>
                <b>Email:</b>
              </span>
              <span className="userShowInfoTitle">{user?.email}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="username"
                  className="userUpdateInput"
                  onChange={changeHandler}
                />
              </div>
              <div className="userUpdateItem">
                <label>Full name</label>
                <input
                  type="text"
                  name="fullname"
                  placeholder="full name"
                  className="userUpdateInput"
                  onChange={changeHandler}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  placeholder="email"
                  className="userUpdateInput"
                  onChange={changeHandler}
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone number</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="phone number"
                  className="userUpdateInput"
                  onChange={changeHandler}
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: 'none' }} />
              </div>
              <button className="userUpdateButton" onClick={updateHandler}>
                Update
              </button>
            </div>
          </form>
          <Stack spacing={3}>
            {error && <Alert severity="error">Error! {error}</Alert>}
            {isSuccess && (
              <Alert severity="success">The user information was updated success!</Alert>
            )}
          </Stack>
        </div>
      </div>
    </div>
  )
}
