import { useState, useEffect } from 'react';

import newsApi from '../../utils/NewsApi';

import Header from '../Header/Header';
import NewsCardList from '../NewsCardList/NewsCardList';
import AboutAuthor from '../AboutAuthor/AboutAuthor';
import Footer from '../Footer/Footer';


function Main({ logout, openLoginPopup }) {

  const defaultNumberCardsShown = 3;
  const [keyword, setKeyword] = useState('');
  const [cards, setCards] = useState([]);
  const [numberCardsShown, setNumberCardsShown] = useState(defaultNumberCardsShown);
  const [isLoading, setIsLoading] = useState(false);
  const [newsError, setNewsError] = useState(false);


  function searchByKeyword(keyword) {
    setKeyword(keyword);
  }

  function showMoreCards() {
    setNumberCardsShown(numberCardsShown + defaultNumberCardsShown);
  }


  useEffect(() => {
    if(keyword !== '') {
      setIsLoading(true);
      setNewsError(false);
      setNumberCardsShown(defaultNumberCardsShown);
      newsApi.getCardsByKeyword(keyword)
        .then((cards) => {
          setIsLoading(false);
          setCards(cards);
        })
        .catch((err) => {
          setIsLoading(false);
          setNewsError(true);
          console.log(err);
        });
    }
  }, [keyword]);


  return (
    <>
      <Header handleSearch={searchByKeyword} logout={logout} openLoginPopup={openLoginPopup} />
      
      {(keyword || isLoading) ? 
        <NewsCardList 
          cards={cards.slice(0, numberCardsShown)} 
          totalCards={cards.length}
          isLoading={isLoading} 
          isSearch={true} 
          newsError={newsError}
          openLoginPopup={openLoginPopup} 
          keyword={keyword} 
          showMoreCards={showMoreCards}
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