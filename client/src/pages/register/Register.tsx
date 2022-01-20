import React, { useState, useEffect } from 'react'
import './register.scss'
import { NavLink } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { register } from '../../store/reducers/ActionsCreators'
import { clearError, setIsSuccess } from '../../store/reducers/AuthSlice'
import { useHistory } from 'react-router-dom'
import { RegisterData } from '../../models/IUser'

const question = [
  {
    question: 'What is Netflix?',
    answerPart1:
      'Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.',
    answerPart2:
      "You can watch as much as you want, whenever you want without a single commercial – all for one low monthly price. There's always something new to discover and new TV shows and movies are added every week!",
  },
  {
    question: 'How much does Netflix cost?',
    answerPart1:
      'Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from EUR4.99 to EUR9.99 a month. No extra costs, no contracts.',
    answerPart2: '',
  },
  {
    question: 'Where can I watch?',
    answerPart1:
      'Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.',
    answerPart2:
      "You can also download your favorite shows with the iOS, Android, or Windows 10 app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere.",
  },
  {
    question: 'How do I cancel?',
    answerPart1:
      'Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.',
    answerPart2: '',
  },
  {
    question: 'What can I watch on Netflix?',
    answerPart1:
      'Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.',
    answerPart2: '',
  },
  {
    question: 'Is Netflix good for kids?',
    answerPart1:
      'The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space.',
    answerPart2:
      'Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see.',
  },
  {
    question: 'Why am I seeing this language?',
    answerPart1: 'Your browser preferences determine the language shown here.',
    answerPart2: '',
  },
]

export const Register: React.FC = () => {
  const [registerData, setRegisterData] = useState<RegisterData>({
    email: '',
    password: '',
    username: '',
  })
  const [isGetStated, setIsGetStated] = useState<boolean>(false)
  const [isOpenAnswer, setIsOpenAnswer] = useState<boolean>(false)
  const [indexQuestion, setIndexQuestion] = useState<number | null>(null)

  const dispatch = useAppDispatch()
  const { isLoading, error, isSuccess } = useAppSelector((state) => state.authReducer)
  const history = useHistory()

  useEffect(() => {
    return () => {
      dispatch(clearError())
    }
  }, [])

  useEffect(() => {
    if (isSuccess) {
      history.push('/login')
      dispatch(setIsSuccess(false))
    }
  }, [isSuccess])

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value })
  }

  const handleGetStated = () => {
    setIsGetStated(true)
  }

  const handleFinish = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(register(registerData))
  }

  const handleClickQueston = (index: number) => {
    if (indexQuestion !== index) {
      setIndexQuestion(index)
    } else {
      setIndexQuestion(index)
      setIsOpenAnswer(!isOpenAnswer)
    }
 
  }

  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
            className="logo"
          />
          <button className="loginButton">
            <NavLink to="/login">Sign in</NavLink>
          </button>
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
              placeholder="Email address"
              value={registerData.email}
              onChange={changeHandler}
            />
            <button className="registerButton" onClick={handleGetStated}>
              Get started
            </button>
          </div>
        ) : (
          <>
            {error && <div className="error">{error}</div>}
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
              <button disabled={isLoading} className="registerButton" onClick={handleFinish}>
                Start
              </button>
            </form>
          </>
        )}
      </div>
      <div className="section">
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
      <div className="section">
        <div className="container">
          <div className="cardImg ">
            <img
              src="	https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg"
              alt=""
            />
            <div className="cardImgAnimation">
              <img
                src="	https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/boxshot.png"
                alt=""
              />
              <div>
                <h6>Stranger Thinks</h6>
                <span>Downloading...</span>
              </div>
            </div>
          </div>
          <div className="cardInfo">
            <h1>Download your shows to watch offline.</h1>
            <h2>Save your favorites easily and always have something to watch.</h2>
          </div>
        </div>
      </div>
      <div className="section">
        <div className="container">
          <div className="cardInfo">
            <h1>Watch everywhere.</h1>
            <h2>
              Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV without
              paying more.
            </h2>
          </div>
          <div className="cardImg">
            <img
              src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/device-pile.png"
              alt=""
            />
            <div className="cardImgVideo video2">
              <video autoPlay loop muted playsInline>
                <source
                  src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-devices.m4v"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </div>
      </div>
      <div className="section">
        <div className="container">
          <div className="cardImg ">
            <img
              src="https://occ-0-1432-1433.1.nflxso.net/dnm/api/v6/19OhWN2dO19C9txTON9tvTFtefw/AAAABdFTpLmANuJpYneLq8L5m7CunMCi8e8Nl4y7xaPVWzG3IeoDoq17egTQAthApKg_4sdRWdwuR8KadWu1frjL3JQImpwq.png?r=fcd"
              alt=""
            />
          </div>
          <div className="cardInfo">
            <h1>Create profiles for kids.</h1>
            <h2>
              Send kids on adventures with their favorite characters in a space made just for
              them—free with your membership.
            </h2>
          </div>
        </div>
      </div>
      <div className="section">
        <div className="container">
          <div className="faq">
            <h1>Frequently Asked Questions</h1>
            <ul>
              {question.map((item, index) => {
                return (
                  <li key={index}>
                    <button onClick={() => handleClickQueston(index)}>
                      {item.question}{' '}
                      <svg
                        className={`${
                          isOpenAnswer && indexQuestion === index ? 'svgOpen' : 'svgClosed'
                        }`}
                        viewBox="0 0 26 26"
                        focusable="true">
                        <path d="M10.5 9.3L1.8 0.5 0.5 1.8 9.3 10.5 0.5 19.3 1.8 20.5 10.5 11.8 19.3 20.5 20.5 19.3 11.8 10.5 20.5 1.8 19.3 0.5 10.5 9.3Z"></path>
                      </svg>
                    </button>
                    <div
                      className={`${
                        isOpenAnswer && indexQuestion === index ? 'answerOpen' : 'answerClosed'
                      }`}>
                      <span>
                        {item.answerPart1}
                        {item.answerPart2 ? (
                          <>
                            <br />
                            <br />
                            {item.answerPart2}
                          </>
                        ) : (
                          ''
                        )}
                      </span>
                    </div>
                  </li>
                )
              })}
            </ul>
            <div className="registerForm">
              <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
              {!isGetStated ? (
                <div className="input">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={registerData.email}
                    onChange={changeHandler}
                  />
                  <button className="registerButton" onClick={handleGetStated}>
                    Get started
                  </button>
                </div>
              ) : (
                <>
                  {error && <div className="error">{error}</div>}
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
                    <button disabled={isLoading} className="registerButton" onClick={handleFinish}>
                      Start
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="section">
        <div className="footer">
          <h3>Questions? Call 0800-509-417</h3>
          <ul>
            <li>FAQ</li>
            <li>Investor Relations</li>
            <li>Privacy</li>
            <li>Speed test</li>
            <li>Help Center</li>
            <li>Jobs</li>
            <li>Cookie Preferences</li>
            <li>Legal Noticed</li>
            <li>Account</li>
            <li>Ways to Watch</li>
            <li>Corporate Information</li>
            <li>Only on Netflix</li>
            <li>Media Center</li>
            <li>Terms of Use</li>
            <li>Contact Us</li>
          </ul>
          <span>Netflix Ukraine</span>
        </div>
      </div>
    </div>
  )
}
