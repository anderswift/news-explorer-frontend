import Preloader from '../Preloader/Preloader';
import NoNewsResults from '../NoNewsResults/NoNewsResults';
import Card from '../Card/Card';
import ShowMoreButton from '../ShowMoreButton/ShowMoreButton';

import '../PageSection/PageSection.css';
import '../List/List.css';
import './NewsCardList.css';

function NewsCardList({ 
  cards, 
  totalCards, 
  isLoading, 
  isSearch, 
  keyword, 
  openLoginPopup, 
  showMoreCards, 
  newsError, 
  updateSavedCards,
  deleteCard
}) {

  return (
    <section className="news-cards">
      {isLoading ? 
        <Preloader /> 
        :
        <>
          {cards.length === 0 ? 
            <NoNewsResults isError={newsError} />
            :
            <>
              {isSearch ? <h3 className="news-cards__heading page-section">Search results</h3> : null}

              <ul className="news-cards__list list page-section">

                {cards.map((card) => (
                  <Card 
                    card={card} 
                    key={card._id || card.url} 
                    isSavedNews={!isSearch} 
                    keyword={keyword} 
                    openLoginPopup={openLoginPopup} 
                    updateSavedCards={updateSavedCards}
                    deleteCard={deleteCard}
                  />
                ))}

              </ul>
              {cards.length < totalCards ? <ShowMoreButton showMoreCards={showMoreCards} /> : null } 
            </>

          }
        </>

      }    
    </section>
  );
}

export default NewsCardList;