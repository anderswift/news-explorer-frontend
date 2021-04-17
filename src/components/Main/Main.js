import { useContext } from 'react';

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
  keyword,
  searchForNews,
  isLoading,
  newsError,
  numberCardsShown,
  showMoreCards
}) {

  const currentUserContext = useContext(CurrentUserContext);


  return (
    <>
      <Header handleSearch={searchForNews} logout={logout} openLoginPopup={openLoginPopup} />
      
      {(keyword || currentUserContext.lastSearchKeyword || isLoading) 
        ? 
        <NewsCardList 
          cards={Array.isArray(currentUserContext.cards) ? currentUserContext.cards.slice(0, numberCardsShown) : []} 
          totalCards={Array.isArray(currentUserContext.cards) ? currentUserContext.cards.length : 0}
          isLoading={isLoading} 
          isSearch={true} 
          newsError={newsError}
          openLoginPopup={openLoginPopup} 
          keyword={keyword || currentUserContext.lastSearchKeyword} 
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