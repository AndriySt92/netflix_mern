import React, { useState } from 'react'
import './login.scss'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { LoginData } from '../../models/IUser'
import {login} from '../../store/reducers/authReducer/ActionsCreators'
import { NavLink } from 'react-router-dom'

export const Login = () => {
  const [formData, setFormData] = useState<LoginData>({ email: '', password: '' })
  const dispatch = useAppDispatch()
  const { isLoading, error } = useAppSelector((state) => state.authReducer)

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleLogin = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(login(formData));
  };
  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
        </div>
      </div>
      <div className="loginForm">
        <form action="">
          <h1>Sign In</h1>
          {error && <div className='error'>{error}</div>}
          <input type="email" name='email' value={formData.email} onChange={changeHandler} placeholder="Enter email or phone number" />
          <input type="password"name='password' value={formData.password} onChange={changeHandler} placeholder="Enter password" />
          <button disabled={isLoading} className="loginButton" onClick={handleLogin}>Sign In</button>
          <div className="checkboxWrapper">
            <div>
              <input type="checkbox" className="myinput" />
              <span>Remember me</span>
            </div>
            <p>Need help?</p>
          </div>
          <div className="fbLogin">
            <img
              src="https://assets.nflxext.com/ffe/siteui/login/images/FB-f-Logo__blue_57.png"
              alt=""
            />
            <a href="https://uk-ua.facebook.com/">Login with Facebook</a>
          </div>
          <span>
            {' '}
            New to Netflix? <b><NavLink to='/register' className='link'>Sign up now.</NavLink></b>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a bot. <b>Learn more</b>
            .
          </small>
        </form>
      </div>
    </div>
  )
}
