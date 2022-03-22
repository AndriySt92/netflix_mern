import React, { useState } from 'react'
import { ArrowDropDown, Notifications, Search } from '@material-ui/icons'
import userLogo from '../../images/users/1.png'
import './navbar.scss'
import { Link, useHistory } from 'react-router-dom'
import { logout } from '../../store/reducers/authReducer/AuthSlice'
import { useAppDispatch } from '../../hooks/redux'
import { searchMovie } from '../../store/reducers/movieReducer/ActionsCreators'

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const [visibleInput, setVisibleInput] = useState<boolean>(false)
  const [text, setText] = useState<string>('')
  const dispatch = useAppDispatch()
  const history = useHistory()

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem('user')
    history.push('/login')
  }

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true)
    return () => (window.onscroll = null)
  }

  const handleIconSearch = () => {
    setVisibleInput(true)
  }

  const handleSearch = () => {
    if(text){
      dispatch(searchMovie(text))
      history.push('/searchMovie')
      setVisibleInput(false)
      setText('')
    }
  }

  return (
    <div className={isScrolled ? 'navbar scrolled' : 'navbar'}>
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
          <Link to='/newMovies' className="link"><span>New and Popular</span></Link>
          <Link to='/myList' className="link"><span>My List</span></Link>
        </div>
        <div className="right">
          {!visibleInput ? (
            <Search className="icon" onClick={handleIconSearch} />
          ) : (
            <div className='search'>
              {' '}
              <input value={text} type="email" name="email" placeholder="Email address" onChange={(e) => setText(e.target.value)} />
              <Search className="icon" onClick={handleSearch} />
            </div>
          )}
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
