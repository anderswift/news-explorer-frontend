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
  const [activePopup, setActivePopup] = useState('');
  const [popupErrorMessage, setPopupErrorMessage] = useState('');
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
        updateUserStatus(res);
      })
      .catch((err) => {
        console.log(err);
        setPopupErrorMessage(err);
      }).finally(() => {
        setIsSaving(false);
      });
  };

  const updateUserStatus = (userData) => {
    setIsLoggedIn(true);
    setCurrentUser(userData);
    closePopups();
  }

  const register = (credentials) => {
    setIsSaving(true);
    api.register(credentials)
      .then((res) => {
        openPopup('register-success')
      })
      .catch((err) => {
        setPopupErrorMessage(err);
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  const closePopups = () => {
    document.removeEventListener('keyup', closeOnEsc);
    setActivePopup('');
    setPopupErrorMessage('');
  };

  const openPopup = (label) => {
    setPopupErrorMessage('');
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
        if (res) {
          setIsLoggedIn(true);
          setCurrentUser(res);
        }
      }).catch((err) => {
        console.log(err);
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
          <ProtectedRoute path="/saved-news" isLoggedIn={isLoggedIn} component={SavedNews} logout={handleLogout} openLoginPopup={() => openPopup('login')} />

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
        errorMessage={popupErrorMessage}
        clearErrorMessage={() => setPopupErrorMessage('')}
        isSaving={isSaving}
      />

      <FormLogin
        isOpen={activePopup === 'login'}
        onClose={closePopups}
        openRegisterPopup={() => openPopup('register')}
        onSubmit={handleLogin}
        errorMessage={popupErrorMessage}
        clearErrorMessage={() => setPopupErrorMessage('')}
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
