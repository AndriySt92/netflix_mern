import React from 'react'
import './login.scss'

export const Login = () => {
  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img className='logo'
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
        </div>
      </div>
      <div className="container">
        <form action="">
          <h1>Sign In</h1>
          <input type="email" placeholder="Enter email or phone number" />
          <input type="password" placeholder="Enter password" />
          <button className="loginButton">Sign In</button>
          <div className='checkboxWrapper'>
            <div>
              <input type="checkbox" className='myinput' />
              <span>Remember me</span>
            </div>
            <p>Need help?</p>
          </div>
          <div className='fbLogin'>
            <img src="https://assets.nflxext.com/ffe/siteui/login/images/FB-f-Logo__blue_57.png" alt="" />
            <a href="https://uk-ua.facebook.com/">Login with Facebook</a>
          </div>
          <span>
            {' '}
            New to Netflix? <b>Sign up now.</b>
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
