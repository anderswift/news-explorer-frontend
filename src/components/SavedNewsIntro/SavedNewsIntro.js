import { useState, useContext } from 'react';

import CurrentUserContext from '../../contexts/CurrentUserContext'; 

import '../PageSection/PageSection.css';
import '../List/List.css';
import '../Button/Button.css';
import '../Link/Link.css';
import './SavedNewsIntro.css';

function SavedNewsIntro({ cardCount, keywords }) {

  const currentUserContext = useContext(CurrentUserContext);
  const [displayedKeywords, setDisplayedKeywords] = useState(keywords.slice(0, 2));


  function showAllKeywords() {
    setDisplayedKeywords(keywords);
  }

  return (
    <div className="saved-news-intro page-section">
      <h1 className="saved-news-intro__title">Saved articles</h1>
      <h2 className="saved-news-intro__count">
        {currentUserContext.currentUser.name}, you have {cardCount || 0} saved {cardCount === 1 ? 'article' : 'articles'}
      </h2>
      
      <div className="saved-news-intro__keywords">By keywords:&nbsp;
        <ul className="saved-news-intro__keyword-list list">
          {displayedKeywords.map((keyword, index) => (
            <li className="saved-news-intro__keyword-item" key={index}>
              <button className="button button_link link saved-news-intro__keyword-button" type="button">{keyword}</button>
            </li>
          ))}
        
          { keywords.length !== displayedKeywords.length ? 
            <li className="saved-news-intro__keyword-item">
              <button className="button button_link link saved-news-intro__keyword-button saved-news-intro__keyword-button_more" 
                type="button" onClick={showAllKeywords} aria-label={`show ${keywords.length - 2} more keywords`}>
                  and {keywords.length - 2} more
              </button>
            </li>
            : 
            null
          }
        </ul>
      </div>

    </div>
  );
}

export default SavedNewsIntro;