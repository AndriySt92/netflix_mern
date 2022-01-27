import React from 'react'
import './topbar.css'
import { useHistory } from 'react-router-dom'
import { ArrowDropDown } from '@material-ui/icons'
import { useAppSelector } from '../../hooks/redux'
import { logout } from '../../store/reducers/authReducer/AuthSlice'
import { useAppDispatch } from '../../hooks/redux'

export default function Topbar() {
  const { user } = useAppSelector((state) => state.authReducer)
  const dispatch = useAppDispatch()
  const history = useHistory()

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem('user')
    history.push('/login')
  }

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Netflix Admin</span>
        </div>
        <div className="topRight">
          <div className="userName">{user?.username}</div>
          <div className="topbarIconContainer">
          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <span>Setting</span>
              <span onClick={handleLogout}>Logout</span>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}
