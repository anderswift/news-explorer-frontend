import { useState, useContext } from 'react';

import CurrentUserContext from '../../contexts/CurrentUserContext'; 


import '../Button/Button.css';
import './CardButton.css';

function CardButton({ icon, openLoginPopup }) {

  const currentUserContext = useContext(CurrentUserContext);

  const [isSaved, setIsSaved] = useState(false);


  const handleSave = (e) => {
    e.preventDefault();
    if(!currentUserContext.isLoggedIn) openLoginPopup();
    else setIsSaved(!isSaved);
    e.target.blur();
  }

  return (
      <button type="button" aria-label="Save Article" 
        className={`button card__button card__button_${icon}${!currentUserContext.isLoggedIn ? ' card__button_logged-out' : ''}`} 
        onClick={handleSave}>

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