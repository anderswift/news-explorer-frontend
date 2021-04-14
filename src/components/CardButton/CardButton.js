import { useState, useContext } from 'react';

import api from '../../utils/MainApi.js';
import CurrentUserContext from '../../contexts/CurrentUserContext'; 

import '../Button/Button.css';
import './CardButton.css';

function CardButton({ icon, openLoginPopup, updateSavedCards, deleteCard, card, keyword }) {

  const currentUserContext = useContext(CurrentUserContext);
  const [isSaved, setIsSaved] = useState(false);


  const handleClick = (e) => {
    e.preventDefault();

    // if user is not logged in, open log in form
    if(!currentUserContext.isLoggedIn) {
      openLoginPopup();

    } else {

      // if the article hasn't been saved
      if(icon === 'delete') {
        deleteCard(card._id);

      } else {
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
          setIsSaved(true);
        })
        .catch((err) => {
          console.log(err);
        });
      }
    }
  }

  return (
      <button 
        type="button" 
        aria-label={icon === 'save' && isSaved ? 'Save Article' : 'Remove from Saved Articles'} 
        className={`button card__button card__button_${icon}${!currentUserContext.isLoggedIn ? ' card__button_logged-out' : ''}`} 
        onClick={handleClick}>

        <svg className={`button__icon card__button-icon card__button-icon_${icon}${isSaved ? ' card__button-icon_saved' : ''}`} 
          width="24" height="24" viewBox="0 0 24 24">
          {icon === 'save' && 
            <path stroke="currentColor" strokeWidth="2" 
              d="M11.3822 15.7137L6 19.9425V4L18 4V19.9425L12.6178 15.7137L12 15.2283L11.3822 15.7137Z"/>
          }
          {icon === 'delete' && 
            <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" 
              d="M15 3H9V5H3V7H21V5H15V3ZM5 9V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V9H17V20H7V9H5ZM9 9L9 
              18H11L11 9H9ZM13 9V18H15V9H13Z" />
          }
        </svg>
      </button>
  );
}

export default CardButton;