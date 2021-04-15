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
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tokenChecked, setTokenChecked] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const [activePopup, setActivePopup] = useState('');
  const [popupErrorMessage, setPopupErrorMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const [savedCards, setSavedCards] = useState([]);
  const [savedCardIdentifiers, setSavedCardIdentifiers] = useState([]);
  
  const defaultNumberCardsShown = 3;
  const [numberCardsShown, setNumberCardsShown] = useState(defaultNumberCardsShown);


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

  const login = (credentials) => {
    setIsSaving(true);
    return api.login(credentials)
      .then((res) => {
        updateUserStatus(res);
        closePopups();
      })
      .catch((err) => {
        setPopupErrorMessage(err);
      }).finally(() => {
        setIsSaving(false);
      });
  };

  const updateUserStatus = (userData) => {
    setIsLoggedIn(true);
    setCurrentUser(userData);
    api.getSavedNews()
    .then((res) => {
      if (res) setSavedCards(res);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const logout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('search');
    localStorage.removeItem('searchCards');
    setCurrentUser({});
    setIsLoggedIn(false);
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

  const updateSavedCards = (newCard) => {
    setSavedCards([newCard, ...savedCards]);
  }

  const deleteCard = (cardId) => {
    api.deleteNewsCard(cardId)
    .then((res) => {
      const newCards = savedCards.filter((card) => card._id !== cardId);  
      setSavedCards(newCards);
    })
    .catch((err) => {
      console.log(err);
    }); 
  }

  const showMoreCards = () => {
    setNumberCardsShown(numberCardsShown + defaultNumberCardsShown);
  }

  const resetCardsShown = () => {
    setNumberCardsShown(defaultNumberCardsShown);
  }


  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      api.checkToken(token).then((res) => {
        if (res) updateUserStatus(res);
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        setTokenChecked(true);
      });
    } else setTokenChecked(true);
  }, []);

  useEffect(() => {
    if (!isLoggedIn && location.signin) setActivePopup('login');
    else setActivePopup('');
    location.signin = false;
  }, [location, isLoggedIn]);

  useEffect(() => {
    if (Array.isArray(savedCards)) {
      setSavedCardIdentifiers(
        savedCards.reduce((result, { _id, url, publishedAt }) => {
          result[url + publishedAt] = _id;
          return result;
        }, {})
      );
    }
  }, [savedCards]);


  return (
    <CurrentUserContext.Provider value={{ currentUser, isLoggedIn, savedCards, savedCardIdentifiers }}>
      <div className={`container ${activePopup !== '' ? 'container_overlaid' : ''}`}>
        
        <Switch>

          <ProtectedRoute 
            path="/saved-news" 
            isLoggedIn={isLoggedIn} 
            tokenChecked={tokenChecked}
            component={SavedNews} 
            logout={logout} 
            openLoginPopup={() => openPopup('login')}
            updateSavedCards={updateSavedCards}
            deleteCard={deleteCard}
          />

          <Route path="/">
            <Main 
              logout={logout} 
              openLoginPopup={() => openPopup('login')} 
              updateSavedCards={updateSavedCards} 
              deleteCard={deleteCard} 
              numberCardsShown={numberCardsShown}
              showMoreCards={showMoreCards}
              resetCardsShown={resetCardsShown}
            />
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
        onSubmit={login}
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
