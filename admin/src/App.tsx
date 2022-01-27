import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { Login } from './pages/login/Login'
import { setAuthUser } from './store/reducers/authReducer/AuthSlice'
import { useAppDispatch } from './hooks/redux'
import { useAppSelector } from './hooks/redux'
import Topbar from './components/topbar/Topbar'
import Sidebar from './components/sidebar/Sidebar'

function App() {
  const { user } = useAppSelector((state) => state.authReducer)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') as string)
    if (user) {
      dispatch(setAuthUser(user))
      console.log(user)
    }
  }, [])
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
          {user && (
            <>
              <Topbar />
              <div className="container"><Sidebar /></div>
            </>
          )}
        </Switch>
      </Router>
    </div>
  )
}

export default App
