import { useState, useEffect } from 'react';

import { api } from '../../utils/api.js';

import Header from '../Header/Header.js';
import NewsCardList from '../NewsCardList/NewsCardList.js';
import AboutAuthor from '../AboutAuthor/AboutAuthor.js';
import Footer from '../Footer/Footer';


import '../Container/Container.css';

function Main() {

  const [keyword, setKeyword] = useState('');
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  function searchByKeyword(keyword) {
    setKeyword(keyword);
  }


  useEffect(() => {
    if(keyword !== '') setIsLoading(true);
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
  }, [keyword]);


  return (
    <div class="container">
      <Header handleSearch={searchByKeyword} />
      
      {(cards.length || isLoading) ? 
        <NewsCardList cards={cards} isLoading={isLoading} isSearch={true} />
        : 
        null
      }

      <AboutAuthor/>

      <Footer/>
    </div>
  );
}

export default Main;