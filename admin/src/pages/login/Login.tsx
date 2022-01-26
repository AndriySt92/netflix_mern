import React, { useState } from 'react'
import './login.css'
import { LoginData } from '../../models/IUser'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { login } from '../../store/reducers/authReducer/ActionsCreators'

export const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginData>({ email: '', password: '' })
  const dispatch = useAppDispatch()
  const { isLoading, error } = useAppSelector((state) => state.authReducer)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleLogin = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(login(formData))
  }

  return (
    <div className="login">
      <form className="loginForm">
        <h1>Sign In</h1>
        {error && <div className="error">{error}</div>}
        <input type="text" name='email' placeholder="email" className="loginInput" onChange={handleChange} />
        <input
          type="password"
          name='password'
          placeholder="password"
          className="loginInput"
          onChange={handleChange}
        />
        <button disabled={isLoading} className="loginButton" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  )
}
