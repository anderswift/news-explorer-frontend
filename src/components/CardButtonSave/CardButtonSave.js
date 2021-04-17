import { useState, useContext, useEffect } from 'react';

import api from '../../utils/MainApi.js';
import CurrentUserContext from '../../contexts/CurrentUserContext'; 

import './CardButtonSave.css';


function CardButtonSave({ openLoginPopup, updateSavedCards, deleteCard, card, keyword }) {

  const currentUserContext = useContext(CurrentUserContext);
  const [isSaved, setIsSaved] = useState(false);
  const [cardId, setCardId] = useState(card._id || currentUserContext.savedCardIdentifiers[card.url+card.publishedAt]);

  const handleClick = (e) => {
    e.preventDefault();

    // if user is not logged in, open log in form
    if(!currentUserContext.isLoggedIn) {
      openLoginPopup();

    // if the user is logged in, save/remove article
    } else {

      // if the article has already been saved, delete it from saved articles
      if(isSaved) {
        deleteCard(cardId);
        setIsSaved(false);
        e.target.blur();
      // otherwise, save the article
      } else {
        // create object to save from current card data
        const cardData = (({
          title,
          description,
          publishedAt,
          source,
          url,
          urlToImage
        }) => ({
          title,
          description,
          publishedAt,
          source: source.name,
          url,
          urlToImage}))(card);
        cardData.keyword = keyword;

        api.saveNewsCard(cardData)
        .then((newCard) => {
          updateSavedCards(newCard);
          setCardId(newCard._id);
          setIsSaved(true);
          e.target.blur();
        })
        .catch((err) => {
          console.log(err);
        });
      }
    }
  }


  useEffect(() => {
    if(currentUserContext.savedCardIdentifiers && typeof currentUserContext.savedCardIdentifiers === 'object') {
      setIsSaved(currentUserContext.savedCardIdentifiers[card.url+card.publishedAt] !== undefined);
    }
  }, [currentUserContext.savedCardIdentifiers, card]);


  return (
      <button type="button" aria-label={isSaved ? 'Save Article' : 'Remove from Saved Articles'} data-id={cardId} onClick={handleClick}
        className={`button card__button card__button_type_save${!currentUserContext.isLoggedIn ? ' card__button_logged-out' : ''}`}>

        <svg className={`button__icon card__button-icon card__button-icon_type_save${isSaved ? ' card__button-icon_is-saved' : ''}`} 
          width="24" height="24" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeWidth="2" d="M11.3822 15.7137L6 19.9425V4L18 4V19.9425L12.6178 15.7137L12 15.2283L11.3822 15.7137Z"/>
        </svg>
      </button>
  );
}

export default CardButtonSave;