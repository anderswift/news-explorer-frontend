import { useContext } from 'react';

import CurrentUserContext from '../../contexts/CurrentUserContext'; 

import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';
import Footer from '../Footer/Footer';


function SavedNews({ logout, openLoginPopup, deleteCard, updateSavedCards }) {
  
  const currentUserContext = useContext(CurrentUserContext);


  return (
    <>
      <SavedNewsHeader 
        logout={logout} 
        openLoginPopup={openLoginPopup}
      />

      {currentUserContext.savedCards.length ? 
        <NewsCardList 
          cards={currentUserContext.savedCards} 
          deleteCard={deleteCard} 
          updateSavedCards={updateSavedCards}
        /> 
        : 
        null}

      <Footer />
    </>
  );
}

export default SavedNews;