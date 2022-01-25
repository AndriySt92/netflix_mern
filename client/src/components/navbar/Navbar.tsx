import React,{useState} from 'react'
import { ArrowDropDown, Notifications, Search } from '@material-ui/icons'
import userLogo from '../../images/users/1.png'
import './navbar.scss'
import { Link, useHistory } from 'react-router-dom'
import { logout } from '../../store/reducers/authReducer/AuthSlice'
import { useAppDispatch } from '../../hooks/redux'
import { useAppSelector } from '../../hooks/redux'

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const { user } = useAppSelector((state) => state.authReducer)
  const dispatch = useAppDispatch()
  const history = useHistory()

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem('user')
    history.push('/login')
  }

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
          <Link to="/" className="link">
            <span>Homepage</span>
          </Link>
          <Link to="/series" className="link">
            <span className="navbarmainLinks">Series</span>
          </Link>
          <Link to="/movies" className="link">
            <span className="navbarmainLinks">Movies</span>
          </Link>
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
