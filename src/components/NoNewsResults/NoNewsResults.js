import './NoNewsResults.css';

import notFoundImage from '../../images/not-found.svg';


function NoNewsResults({ isError = false }) {

  return (
    <div className="no-news-results">
      {isError 
        ? 
        <>
          <h4 className="no-news-results__heading no-news-results__heading_error">Sorry, something went wrong</h4>
          <p className="no-news-results__p no-news-results__p_error">
            There may be a connection issue or the server may be down. Please try again later.
          </p>
        </>
        :  
        <>
          <svg className="no-news-results__image">
            <use xlinkHref={`${notFoundImage}#not-found`}></use>
          </svg>
          <h4 className="no-news-results__heading">Nothing Found</h4>
          <p className="no-news-results__p">Sorry, nothing matched your search terms.</p>
        </>
      }
    </div>
  );
}

export default NoNewsResults;