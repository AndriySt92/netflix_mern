import React,{useEffect} from 'react';
import './App.css';
import { Login } from './pages/login/Login';
import { setAuthUser } from './store/reducers/authReducer/AuthSlice'
import { useAppDispatch } from './hooks/redux'
import { useAppSelector } from './hooks/redux'

function App() {
  const {user} = useAppSelector(state => state.authReducer)
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

      <Login />
    </div>
  );
}

export default App;
