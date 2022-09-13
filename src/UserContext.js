import React from 'react'
import { TOKEN_POST, USER_GET } from './api';

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [userData, setUserData] = React.useState(null);
  const [isLogged, setIsLogged] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  async function userLogin(username, password) {
    const { url, options } = TOKEN_POST({ username, password });
    const tokenResponse = await fetch(url, options);
    const { token } = await tokenResponse.json();
    window.localStorage.setItem('token', token);
    getUser(token);
  }

  async function getUser(token) {
    const {url, options} = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    setUserData(json);
    setIsLogged(true);
    console.log(json);
  }

  return (
    <UserContext.Provider value={{ userLogin, userData }}>
      {children}
    </UserContext.Provider>
  )
}

