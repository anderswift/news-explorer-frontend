
import '../Button/Button.css';
import './ShowMoreButton.css';


function ShowMoreButton({ showMoreCards }) {

  const onShowMore = (e) => {
    showMoreCards();
    e.target.blur();
  }
  

  return (
    <button className="button button_type_submit show-more" type="button" onClick={onShowMore}>
      Show more
    </button>
  );
}

export default ShowMoreButton;