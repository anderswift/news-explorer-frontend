import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import FormRegister from '../FormRegister/FormRegister';
import FormLogin from '../FormLogin/FormLogin';

import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  // sample user information, to be replaced with info loaded from API
  const [currentUser, setCurrentUser] = useState({ _id: '3456rhwj3456aeh3', email: 'anderswift@gmail.com', username: 'Ander' });
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const logout = () => {
    setCurrentUser({});
    setIsLoggedIn(false);
  };

  const login = () => {
    // login function goes here
    setIsSaving(true);
    console.log('login');
    setIsSaving(false);
  };

  const register = () => {
    // register function goes here
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

  return (
    <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>

      <div className={`container ${isRegisterPopupOpen || isLoginPopupOpen ? 'container_overlaid' : ''}`}>
        <Switch>

          <Route path="/saved-news">
            <SavedNews logout={logout} openLoginPopup={openLoginPopup} />
          </Route>

          <Route path="/">
            <Main logout={logout} openLoginPopup={openLoginPopup} />
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
        onSubmit={login}
        isSaving={isSaving}
      />

    </CurrentUserContext.Provider>
  );
}

export default App;
