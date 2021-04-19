import { useState, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

import api from '../../utils/MainApi.js';
import newsApi from '../../utils/NewsApi.js';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import './App.css';

import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import FormRegister from '../FormRegister/FormRegister';
import FormLogin from '../FormLogin/FormLogin';
import Popup from '../Popup/Popup';


function App() {

  const location = useLocation();
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tokenChecked, setTokenChecked] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const [activePopup, setActivePopup] = useState('');
  const [popupErrorMessage, setPopupErrorMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const [keyword, setKeyword] = useState('');
  const [lastSearchKeyword, setLastSearchKeyword] = useState('');
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);

  const [savedCardKeywords, setSavedCardKeywords] = useState([]);
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
    setKeyword('');
    setLastSearchKeyword('');
    setCards([]);
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

  const closeOnEsc = (e) => { if(e.key === 'Escape') closePopups(); }

  const searchForNews = (searchTerm) => {
    if (searchTerm !== '') {
      setKeyword(searchTerm);
      setIsLoading(true);
      setLoadingError(false);
      resetCardsShown();
      localStorage.removeItem('search');
      localStorage.removeItem('searchCards');
      
      newsApi.getCardsByKeyword(searchTerm)
      .then((newCards) => {
        setIsLoading(false);
        setLastSearchKeyword(searchTerm);
        setCards(newCards); 
        localStorage.setItem('search', searchTerm);
        localStorage.setItem('searchCards', JSON.stringify(newCards));
      })
      .catch((err) => {
        setIsLoading(false);
        setLoadingError(true);
        console.log(err);
      });
    }
  }

  const updateSavedCards = (newCard) => { setSavedCards([newCard, ...savedCards]); }

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

  const showMoreCards = () => { setNumberCardsShown(numberCardsShown + defaultNumberCardsShown); }

  const resetCardsShown = () => { setNumberCardsShown(defaultNumberCardsShown); }


  // on mounting, check for jwt in localStorage and if valid, log in remembered user
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


  // if no new keyword set but user is logged in/remembered, retrieve saved data from last search
  useEffect(() => {  
    if (!keyword && isLoggedIn) {
      const savedSearch = localStorage.getItem('search');
      if(savedSearch) {
        const searchCards = JSON.parse(localStorage.getItem('searchCards'));
        if(searchCards && Array.isArray(searchCards)) {
          setLastSearchKeyword(savedSearch);
          setCards(searchCards);
        }
      }
    }
  }, [isLoggedIn, keyword]);


  // if user was redirected from protected route, show login form
  useEffect(() => {
    if (!isLoggedIn && location.signin) setActivePopup('login');
    else setActivePopup('');
    location.signin = false;
  }, [location, isLoggedIn]);


  // when saved cards are updated, perform related tasks once to store results in global state
  useEffect(() => {
    // generate object to efficiently check search results for saved cards
    if (Array.isArray(savedCards)) {
      setSavedCardIdentifiers(
        savedCards.reduce((result, { _id, url, publishedAt }) => {
          result[url + publishedAt] = _id;
          return result;
        }, {})
      );
    }

    // update sorted list of keywords for saved cards
    if(Array.isArray(savedCards)) {
      let keywordList = savedCards.map(card => card.keyword.toLowerCase());
      let keywordFrequency = [];
      keywordList.forEach((keyword) => { 
        keywordFrequency[keyword] === undefined 
        ? keywordFrequency[keyword] = 1
        : keywordFrequency[keyword]++;
      });

      setSavedCardKeywords(
        Object.keys(keywordFrequency).sort(
          (a, b) => keywordFrequency[b]-keywordFrequency[a]
        )
      );
    }
      
  }, [savedCards]);


  return (
    <CurrentUserContext.Provider value={{ 
      currentUser, isLoggedIn, 
      lastSearchKeyword, cards, 
      savedCards, savedCardKeywords, savedCardIdentifiers 
    }}>

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
              deleteCard={deleteCard}
              updateSavedCards={updateSavedCards}
              keyword={keyword}
              searchForNews={searchForNews}
              numberCardsShown={numberCardsShown}
              showMoreCards={showMoreCards}
              isLoading={isLoading}
              loadingError={loadingError}
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
