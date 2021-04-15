import CardButtonSave from '../CardButtonSave/CardButtonSave';
import CardButtonDelete from '../CardButtonDelete/CardButtonDelete';

import '../Button/Button.css';
import './CardButtons.css';

function CardButtons({ isSavedNews, openLoginPopup, updateSavedCards, deleteCard, card, keyword }) {


  return (
    <>
      { isSavedNews ? (
          <>
            <button type="button" className="card__button_type_keyword card__button button" 
              aria-label={`Filter by keyword: ${card.keyword}`}>
              {card.keyword}
            </button>
            <CardButtonDelete card={card} deleteCard={deleteCard} />
          </>
        )
        : 
        <CardButtonSave 
          card={card} 
          keyword={keyword}
          openLoginPopup={openLoginPopup} 
          deleteCard={deleteCard} 
          updateSavedCards={updateSavedCards} 
        />
      }
    </>
  );
}

export default CardButtons;