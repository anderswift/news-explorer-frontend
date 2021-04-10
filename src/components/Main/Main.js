import { useState, useEffect } from 'react';

import api from '../../utils/api';

import Header from '../Header/Header';
import NewsCardList from '../NewsCardList/NewsCardList';
import AboutAuthor from '../AboutAuthor/AboutAuthor';
import Footer from '../Footer/Footer';


function Main({ logout, openLoginPopup }) {

  const [keyword, setKeyword] = useState('');
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  function searchByKeyword(keyword) {
    setKeyword(keyword);
  }


  useEffect(() => {
    if(keyword !== '') {
      setIsLoading(true);
      api.getCardsByKeyword(keyword)
        .then((cards) => {
          setIsLoading(false);
          setCards(cards); 
          console.log(cards);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    }
  }, [keyword]);


  return (
    <>
      <Header handleSearch={searchByKeyword} logout={logout} openLoginPopup={openLoginPopup} />
      
      {(keyword || isLoading) ? 
        <NewsCardList cards={cards} isLoading={isLoading} isSearch={true} openLoginPopup={openLoginPopup} keyword={keyword} />
        : 
        null
      }

      <AboutAuthor/>

      <Footer/>
    </>
  );
}

export default Main;