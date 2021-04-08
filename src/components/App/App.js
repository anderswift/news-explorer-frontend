import { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({ _id: '3456rhwj3456aeh3', email: 'anderswift@gmail.com', username: 'Ander', about: '', avatar: ''});

  return (
    
    <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>

      <Switch>

        <Route path="/saved-news">
          <SavedNews />
        </Route>

        <Route path="/">
          <Main />
        </Route>

      </Switch>

    </CurrentUserContext.Provider>
  );
}

export default App;
