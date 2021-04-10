import { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import FormRegister from '../FormRegister/FormRegister';
import FormLogin from '../FormLogin/FormLogin';


import './App.css';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  // sample user information, to be replaced with info loaded from API
  const [currentUser, setCurrentUser] = useState({ _id: '3456rhwj3456aeh3', email: 'anderswift@gmail.com', username: 'Ander'});
  const [activePopup, setActivePopup]= useState('');
  const [isSaving, setIsSaving]= useState(false);


  const logout = () => {
    setCurrentUser({});
    setIsLoggedIn(false);
  }

  const login = () => {
    // login function goes here
    console.log('login');
  }

  const register = () => {
    // register function goes here
    console.log('register');
  }

  const openRegisterPopup = () => { 
    setActivePopup('register'); 
    document.addEventListener('keyup', closeOnEsc);
  }

  const openLoginPopup = () => { 
    setActivePopup('login'); 
    document.addEventListener('keyup', closeOnEsc);
  }

  const closePopups = () => {
    setActivePopup('');
    document.removeEventListener('keyup', closeOnEsc);
  }

  const closeOnEsc = (e) => { 
    if(e.key === 'Escape') closePopups(); 
  }


  return (
    
    <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>

      <div className={`container ${activePopup !== '' ? 'container_overlaid' : ''}`}>
        <Switch>

          <Route path="/saved-news">
            <SavedNews logout={logout} openLoginPopup={openLoginPopup} />
          </Route>

          <Route path="/">
            <Main logout={logout} openLoginPopup={openLoginPopup} />
          </Route>

        </Switch>
      </div>

      <FormRegister isOpen={activePopup === 'register'} onClose={closePopups} openLoginPopup={openLoginPopup} onSubmit={register} isSaving={isSaving} />
      <FormLogin isOpen={activePopup === 'login'} onClose={closePopups} openRegisterPopup={openRegisterPopup} onSubmit={login} isSaving={isSaving} />

    </CurrentUserContext.Provider>
  );
}

export default App;
