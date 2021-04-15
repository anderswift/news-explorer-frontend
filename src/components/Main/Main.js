import { useState, useEffect, useContext } from 'react';

import newsApi from '../../utils/NewsApi';
import CurrentUserContext from '../../contexts/CurrentUserContext'; 

import Header from '../Header/Header';
import NewsCardList from '../NewsCardList/NewsCardList';
import AboutAuthor from '../AboutAuthor/AboutAuthor';
import Footer from '../Footer/Footer';


function Main({ 
  logout,
  openLoginPopup,
  deleteCard,
  updateSavedCards,
  numberCardsShown,
  showMoreCards,
  resetCardsShown
}) {

  const currentUserContext = useContext(CurrentUserContext);
  const [newKeyword, setNewKeyword] = useState('');
  const [savedKeyword, setSavedKeyword] = useState('');
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newsError, setNewsError] = useState(false);


  const handleSearch = (keyword) => {
    resetCardsShown();
    setNewKeyword(keyword);
  }


  useEffect(() => {
    // if a keyword has been set for a new search, retrieve articles with NewsApi
    if(newKeyword !== '') {
      setIsLoading(true);
      localStorage.removeItem('search');
      setNewsError(false);
      newsApi.getCardsByKeyword(newKeyword)
        .then((cards) => {
          setIsLoading(false);
          setCards(cards);
          localStorage.setItem('search', newKeyword);
          localStorage.setItem('searchCards', JSON.stringify(cards));
        })
        .catch((err) => {
          setIsLoading(false);
          setNewsError(true);
          console.log(err);
        });
    }
  }, [newKeyword]);

  useEffect(() => {
    // if a new keyword has not been set and user is logged in, check for saved search date
    if(newKeyword === '' && currentUserContext.isLoggedIn) {
      const savedSearch = localStorage.getItem('search');
      if(savedSearch) {
        const searchCards = JSON.parse(localStorage.getItem('searchCards'));
        if(searchCards && Array.isArray(searchCards)) {
          setSavedKeyword(savedSearch);
          setCards(searchCards);
        }
      }
    }
  }, [newKeyword, currentUserContext.isLoggedIn]);


  return (
    <>
      <Header handleSearch={handleSearch} logout={logout} openLoginPopup={openLoginPopup} />
      
      {(newKeyword || savedKeyword || isLoading) ? 
        <NewsCardList 
          cards={cards.slice(0, numberCardsShown)} 
          totalCards={cards.length}
          isLoading={isLoading} 
          isSearch={true} 
          newsError={newsError}
          openLoginPopup={openLoginPopup} 
          keyword={newKeyword || savedKeyword} 
          showMoreCards={showMoreCards}
          deleteCard={deleteCard}
          updateSavedCards={updateSavedCards}
        />
        : 
        null
      }

      <AboutAuthor/>

      <Footer/>
    </>
  );
}

export default Main;