import React from 'react'
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from './api';
import { useNavigate } from 'react-router-dom';

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [userData, setUserData] = React.useState(null);
  const [isLogged, setIsLogged] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();


  const userLogout = React.useCallback(async function() {
    setUserData(null);
    setError(null);
    setLoading(false);
    setIsLogged(false);
    window.localStorage.removeItem('token');
    navigate('/login');
  }, [navigate]);

  async function userLogin(username, password) {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({ username, password });
      const tokenResponse = await fetch(url, options);

      if(!tokenResponse.ok) throw new Error(`Error: ${tokenResponse.statusText}`);
      const { token } = await tokenResponse.json();
      window.localStorage.setItem('token', token);
      await getUser(token);
      navigate('/account');
    } catch(err) {
      setError(err.message);
      setIsLogged(false);
    } finally {
      setLoading(false);
    }
  }

  async function getUser(token) {
    const {url, options} = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    setUserData(json);
    setIsLogged(true);
  }

  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem('token');
      if (token) {
        try {
          setError(null);
          setLoading(true);
          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);
          if (!response.ok) throw new Error('Invalid Token');
          await getUser(token);
        } catch (err) {
          userLogout();
        } finally {
          setLoading(false);
        }

      }
    }

    autoLogin();
  }, [userLogout]);

  return (
    <UserContext.Provider value={{ userLogin, userData, userLogout, isLogged, error, loading }}>
      {children}
    </UserContext.Provider>
  )
}

