import React from 'react'
import { ArrowDropDown, Notifications, Search } from '@material-ui/icons'
import userLogo from '../../images/users/1.png'
import './navbar.scss'
import { logout } from '../../store/reducers/AuthSlice'
import { useAppDispatch } from '../../hooks/redux'
import { useAppSelector } from '../../hooks/redux'

export const Navbar: React.FC = () => {
  const { user } = useAppSelector((state) => state.authReducer)
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem('user')
  }
  return (
    <div className="navbar scroll">
      <div className="container">
        <div className="left">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
          <span>Homepage</span>
          <span>Series</span>
          <span>Movies</span>
          <span>New and Popular</span>
          <span>My List</span>
        </div>
        <div className="right">
          <Search className="icon" />
          <span>KID</span>
          <Notifications className="icon" />
          <img src={userLogo} alt="" />
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
  )
}
