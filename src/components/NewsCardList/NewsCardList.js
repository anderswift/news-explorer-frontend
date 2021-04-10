import Preloader from '../Preloader/Preloader';
import Card from '../Card/Card';
import ShowMoreButton from '../ShowMoreButton/ShowMoreButton';

import '../List/List.css';
import './NewsCardList.css';

function NewsCardList({ cards, isLoading, isSearch, openLoginPopup }) {


  return (
    <section className="news-cards">
      {isLoading ? 
        <Preloader /> 
        :
        <>
          {isSearch ? <h3 className="news-cards__heading">Search results</h3> : null}

          <ul className="news-cards__list list">

            {cards.map((card, index) => (
              <Card card={card} key={index} isSavedNews={!isSearch} openLoginPopup={openLoginPopup} />
            ))}

          </ul>
          <ShowMoreButton />
        </>
      }
    </section>
  );
}

export default NewsCardList;