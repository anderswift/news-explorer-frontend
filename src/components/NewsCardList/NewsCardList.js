import Preloader from '../Preloader/Preloader';
import NoNewsResults from '../NoNewsResults/NoNewsResults';
import Card from '../Card/Card';
import ShowMoreButton from '../ShowMoreButton/ShowMoreButton';


import '../List/List.css';
import './NewsCardList.css';


function NewsCardList({ cards, totalCards, isLoading, isSearch, openLoginPopup, showMoreCards, newsError }) {

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
              {isSearch ? <h3 className="news-cards__heading">Search results</h3> : null}

              <ul className="news-cards__list list">

                {cards.map((card, index) => (
                  <Card card={card} key={index} isSavedNews={!isSearch} openLoginPopup={openLoginPopup} />
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