import { useState } from 'react';

import Preloader from '../Preloader/Preloader';
import Card from '../Card/Card';
import ShowMoreButton from '../ShowMoreButton/ShowMoreButton';

import '../List/List.css';
import './SearchResults.css';

function SearchResults({ cards, isLoading }) {



  return (
    (cards.length || isLoading) && 
    <section className="search-results">
      {isLoading ? 
        <Preloader /> 
        :
        <>
          <ul className="search-results__list list">

            {cards.map((card, index) => (
              <Card card={card} key={index} />
            ))}

          </ul>
          <ShowMoreButton />
        </>
      }
    </section>
  );
}

export default SearchResults;