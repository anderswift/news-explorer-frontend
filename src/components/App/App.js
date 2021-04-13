import { useState, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

import api from '../../utils/MainApi.js';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import FormRegister from '../FormRegister/FormRegister';
import FormLogin from '../FormLogin/FormLogin';
import Popup from '../Popup/Popup';

import './App.css';

function App() {

  const location = useLocation();
  
  const [token, setToken] = useState(localStorage.getItem('jwt'));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [activePopup, setActivePopup] = useState('register-success');
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
    setActivePopup('');
  };

  const openPopup = (label) => {
    if(activePopup !== '') document.addEventListener('keyup', closeOnEsc);
    setActivePopup(label);
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
    if (!isLoggedIn && location.signin) setActivePopup('login');
    else setActivePopup('');
    location.signin = false;
  }, [location, isLoggedIn]);


  return (
    <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
      <div className={`container ${activePopup !== '' ? 'container_overlaid' : ''}`}>
        
        <Switch>
          <ProtectedRoute path="/saved-news" component={SavedNews} logout={handleLogout} openLoginPopup={() => openPopup('login')} />

          <Route path="/">
            <Main logout={handleLogout} openLoginPopup={() => openPopup('login')} />
          </Route>

        </Switch>
      </div>

      <FormRegister
        isOpen={activePopup === 'register'}
        onClose={closePopups}
        openLoginPopup={() => openPopup('login')}
        onSubmit={register}
        isSaving={isSaving}
      />

      <FormLogin
        isOpen={activePopup === 'login'}
        onClose={closePopups}
        openRegisterPopup={() => openPopup('register')}
        onSubmit={handleLogin}
        isSaving={isSaving}
      />

      <Popup isOpen={activePopup === 'register-success'} onClose={closePopups}>
        <p className="popup__heading">Registration successfully completed!</p>
        <button type="button" className="popup__link button button_link" onClick={() => openPopup('login')}>
          Sign in
        </button>
      </Popup>

    </CurrentUserContext.Provider>
  );
}

export default App;
