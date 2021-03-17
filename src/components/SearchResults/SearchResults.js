import { useState } from 'react';

import Preloader from '../Preloader/Preloader';

import './SearchResults.css';

function SearchResults() {

  const [isLoading, setIsLoading] = useState(true);

  return (
    <section className="search-results">
      {isLoading && <Preloader />}
    </section>
  );
}

export default SearchResults;