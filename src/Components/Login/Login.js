import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { UserContext } from '../../UserContext'
import LoginCreate from './LoginCreate'
import LoginForm from './LoginForm'
import LoginPasswordLost from './LoginPasswordLost'
import LoginPasswordReset from './LoginPasswordReset'

const Login = () => {
  const { isLogged } = React.useContext(UserContext)

  if(isLogged === true) return <Navigate to="/account"/>

  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/create" element={<LoginCreate />} />
        <Route path="/lost" element={<LoginPasswordLost />} />
        <Route path="/reset" element={<LoginPasswordReset />} />
      </Routes>
    </div>
  )
}

export default Login
