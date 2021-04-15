function CardButtonDelete({ card, deleteCard }) {

  const handleDelete = (e) => {
    e.preventDefault();
    deleteCard(card._id);
  }


  return (
    <button type="button" aria-label="Remove from Saved Articles" className="button card__button card__button_type_delete"
      onClick={handleDelete}>

      <svg className="button__icon card__button-icon" width="24" height="24" viewBox="0 0 24 24">
        <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" 
          d="M15 3H9V5H3V7H21V5H15V3ZM5 9V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V9H17V20H7V9H5ZM9 9L9 
          18H11L11 9H9ZM13 9V18H15V9H13Z" />
      </svg>

    </button>
  );
}

export default CardButtonDelete;