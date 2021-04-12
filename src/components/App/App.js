import { useState, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

import api from '../../utils/MainApi.js';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import FormRegister from '../FormRegister/FormRegister';
import FormLogin from '../FormLogin/FormLogin';

import './App.css';

function App() {

  const location = useLocation();
  
  const [token, setToken] = useState(localStorage.getItem('jwt'));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setToken('');
    setCurrentUser({});
    setIsLoggedIn(false);
  };

  const handleLogin = (credentials) => {
    setIsSaving(true);
    return api.login(credentials)
      .then((res) => {
        login(res);
        setIsSaving(false);
      })
      .catch(() => {
        setIsSaving(false);
      });
  };

  const login = (userData) => {
    setIsLoggedIn(true);
    setCurrentUser(userData);
    closePopups();
  }

  const register = () => {
    setIsSaving(true);
    console.log('register');
    setIsSaving(false);
  };

  const closePopups = () => {
    document.removeEventListener('keyup', closeOnEsc);
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(false);
  };

  const openRegisterPopup = () => {
    document.addEventListener('keyup', closeOnEsc);
    setIsRegisterPopupOpen(true);
  };

  const openLoginPopup = () => {
    document.addEventListener('keyup', closeOnEsc);
    setIsLoginPopupOpen(true);
  };

  const closeOnEsc = (e) => { 
    if(e.key === 'Escape') {
      closePopups();
    }
  }


  useEffect(() => {
    setToken(localStorage.getItem('jwt'));
    if (token) {
      api.checkToken(token).then((res) => {
        console.log(res);
        if (res) {
          setIsLoggedIn(true);
          setCurrentUser(res);
        }
      });
    }
  }, [token]);


  useEffect(() => {
    if (!isLoggedIn && location.signin) setIsLoginPopupOpen(true);
    else setIsLoginPopupOpen(false);
    location.signin = false;
  }, [location, isLoggedIn]);


  return (
    <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
      <div className={`container ${isRegisterPopupOpen || isLoginPopupOpen ? 'container_overlaid' : ''}`}>
        
        <Switch>
          <ProtectedRoute path="/saved-news" component={SavedNews} logout={handleLogout} openLoginPopup={openLoginPopup} />

          <Route path="/">
            <Main logout={handleLogout} openLoginPopup={openLoginPopup} />
          </Route>

        </Switch>
      </div>

      <FormRegister
        isOpen={isRegisterPopupOpen}
        onClose={closePopups}
        openLoginPopup={openLoginPopup}
        onSubmit={register}
        isSaving={isSaving}
      />

      <FormLogin
        isOpen={isLoginPopupOpen}
        onClose={closePopups}
        openRegisterPopup={openRegisterPopup}
        onSubmit={handleLogin}
        isSaving={isSaving}
      />

    </CurrentUserContext.Provider>
  );
}

export default App;
