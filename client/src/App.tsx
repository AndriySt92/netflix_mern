import React, { useEffect } from 'react'
import './App.scss'
import { Register } from './pages/register/Register'
import { Login } from './pages/login/Login'
import { Watch } from './pages/watch/Watch'
import { Home } from './pages/home/Home'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { setAuthUser } from './store/reducers/authReducer/AuthSlice'
import { useAppDispatch } from './hooks/redux'
import { useAppSelector } from './hooks/redux'
import { Error } from './components/error/Error'
import { NewMoviesList } from './components/newMovieList/NewMovieList'

function App() {
  const {user} = useAppSelector(state => state.authReducer)
  const dispatch = useAppDispatch() 
  

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') as string)
    if (user) {
      dispatch(setAuthUser(user))
      
    }
  }, [])
  
  return (
    <Router>
    <Switch>
      <Route path="/register">
        {!user ? <Register /> : <Redirect to="/" />}
      </Route>
      <Route path="/login">{!user ? <Login /> : <Redirect to="/" />}</Route>
      <Route exact path="/:content?">
        {user ? <Home /> : <Redirect to="/register" />}
      </Route>
      {user && (
        <>
          <Route path="/movies">
            <Home type="movies" />
          </Route>
          <Route path="/series">
            <Home type="series" />
          </Route>
          <Route path="/watch">
            <Watch />
          </Route>
          <Route path="*">
            <Error error='Not Found 404' />
          </Route>
        </>
      )}
    </Switch>
  </Router>
  )
}

export default App
