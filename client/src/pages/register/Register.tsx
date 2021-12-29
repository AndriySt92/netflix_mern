import React, { useRef, useState } from 'react'
import './register.scss'

interface IRegisterData {
  email: string
  password: string
  username: string
}

export const Register: React.FC = () => {
  const [registerData, setRegisterData] = useState<IRegisterData>({
    email: '',
    password: '',
    username: '',
  })
  const [isGetStated, setIsGetStated] = useState<boolean>(false)

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name, e.target.value)
    setRegisterData({ ...registerData, [e.target.name]: e.target.value })
  }

  const handleGetStated = () => {
    setIsGetStated(true)
  }
  const handleFinish = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
    } catch (error) {}
  }
  return (
    <>
      <div className="register">
        <div className="top">
          <div className="wrapper">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
              alt=""
              className="logo"
            />
            <button className="loginButton">Sign in</button>
          </div>
        </div>
        <div className="registerForm">
          <div className="registerFormHeader">
            <h1>Unlimited movies, TV shows, and more</h1>
            <h2>Watch anywhere. Cancel anytime.</h2>
            <p>Ready to watch? Enter your email to create or restart your membership.</p>
          </div>

          {!isGetStated ? (
            <div className="input">
              <input
                type="email"
                name="email"
                placeholder="email address"
                value={registerData.email}
                onChange={changeHandler}
              />
              <button className="registerButton" onClick={handleGetStated}>
                Get started
              </button>
            </div>
          ) : (
            <form action="" className="input">
              <input
                type="username"
                placeholder="username"
                name="username"
                value={registerData.username}
                onChange={changeHandler}
              />
              <input
                type="password"
                name="password"
                placeholder="password"
                value={registerData.password}
                onChange={changeHandler}
              />
              <button className="registerButton" onClick={handleFinish}>
                Start
              </button>
            </form>
          )}
        </div>
      </div>
      <div className="section card">
        <div className="container">
          <div className="cardInfo">
            <h1>Enjoy on your TV.</h1>
            <h2>
              Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and
              more.
            </h2>
          </div>
          <div className="cardImg">
            <img
              src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png"
              alt=""
            />
            <div className="cardImgVideo">
              <video autoPlay loop muted playsInline>
                <source
                  src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-0819.m4v"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
