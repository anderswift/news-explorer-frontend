import { RESPONSE_MSG } from '../../utils/constants.js';

import './NoNewsResults.css';

import notFoundImage from '../../images/not-found.svg';


function NoNewsResults({ isError = false }) {

  return (
    <div className="no-news-results">
      {isError 
        ? 
        <>
          <h4 className="no-news-results__heading no-news-results__heading_error">{RESPONSE_MSG.searchConnectionError.title}</h4>
          <p className="no-news-results__p no-news-results__p_error">
            {RESPONSE_MSG.searchConnectionError.content}
          </p>
        </>
        :  
        <>
          <svg className="no-news-results__image">
            <use xlinkHref={`${notFoundImage}#not-found`}></use>
          </svg>
          <h4 className="no-news-results__heading">{RESPONSE_MSG.searchNothingFound.title}</h4>
          <p className="no-news-results__p">{RESPONSE_MSG.searchNothingFound.content}</p>
        </>
      }
    </div>
  );
}

export default NoNewsResults;