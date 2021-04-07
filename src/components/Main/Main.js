import { useState, useEffect } from 'react';

import { api } from '../../utils/api.js';

import Header from '../Header/Header.js';
import SearchResults from '../SearchResults/SearchResults.js';
import AboutAuthor from '../AboutAuthor/AboutAuthor.js';


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
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, [keyword]);


  return (
    <>
      <Header handleSearch={searchByKeyword} />
      
      <SearchResults cards={cards} isLoading={isLoading} />

      <AboutAuthor />
    </>
  );
}

export default Main;