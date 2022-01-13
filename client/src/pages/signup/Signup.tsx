import React from 'react'
import '../login/login.scss'

export const Signup: React.FC = () => {
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
              <h1>Sign Up</h1>
              <input type="username" placeholder="Enter First Name" />
              <input type="password" placeholder="Enter password" />
              <button className="loginButton">Sign Up</button>
              <span>
                {' '}
                Already a user? <b>Sign in now.</b>
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
