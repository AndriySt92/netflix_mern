import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { Login } from './pages/login/Login'
import { setAuthUser } from './store/reducers/authReducer/AuthSlice'
import { useAppDispatch } from './hooks/redux'
import { useAppSelector } from './hooks/redux'
import Topbar from './components/topbar/Topbar'
import Sidebar from './components/sidebar/Sidebar'
import { UserList } from './pages/usersList/UsersList'
import User from './pages/user/User'
import {MovieList} from './pages/movieList/MovieList'
import {Movie} from './pages/movie/Movie'
import {NewMovie} from './pages/newMovie/NewMovie'
import { ListList } from './pages/listList/ListList'
import { List } from './pages/list/List'
import { AddList } from './pages/addList/AddList'

function App() {
  const { user } = useAppSelector((state) => state.authReducer)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') as string)
    if (user) {
      dispatch(setAuthUser(user))
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
              <div className="container">
                <Sidebar />
                <Route path="/users">
                  <UserList />
                </Route>
                <Route path="/user/:userId">
                  <User />
                </Route>
                <Route path="/movies">
                  <MovieList />
                </Route>
                <Route path="/movie/:movieId">
                  <Movie />
                </Route>
                <Route path="/newMovie">
                  <NewMovie />
                </Route>
                <Route path="/lists">
                  <ListList />
                </Route>
                <Route path="/list/:listId">
                  <List />
                </Route>
                <Route path="/newList">
                  <AddList />
                </Route>
              </div>
            </>
          )}
        </Switch>
      </Router>
    </div>
  )
}

export default App
