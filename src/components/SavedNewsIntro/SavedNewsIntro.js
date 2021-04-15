import { useState, useContext, useEffect } from 'react';

import CurrentUserContext from '../../contexts/CurrentUserContext'; 

import '../PageSection/PageSection.css';
import '../List/List.css';
import '../Button/Button.css';
import '../Link/Link.css';
import './SavedNewsIntro.css';


function SavedNewsIntro() {

  const currentUserContext = useContext(CurrentUserContext);
  const [keywords, setKeywords] = useState([]);
  const [showAllKeywords, setShowAllKeywords] = useState(false);


  const cardCount = () => { return currentUserContext.savedCards.length; }


  useEffect(() => {
    if(Array.isArray(currentUserContext.savedCards)) {
      let keywordList = currentUserContext.savedCards.map(card => card.keyword.toLowerCase());
      let keywordFrequency = [];
      keywordList.forEach((keyword) => { 
        keywordFrequency[keyword] === undefined 
        ? keywordFrequency[keyword] = 1
        : keywordFrequency[keyword]++;
      });

      setKeywords(
        Object.keys(keywordFrequency).sort(
          (a, b) => keywordFrequency[b]-keywordFrequency[a]
        )
      );
    }
    
  }, [currentUserContext.savedCards]);


  return (
    <div className="saved-news-intro page-section">
      <h1 className="saved-news-intro__title">Saved articles</h1>
      <h2 className="saved-news-intro__count">
        {currentUserContext.currentUser.name}, you have {cardCount() || 0} saved {cardCount() === 1 ? 'article' : 'articles'}
      </h2>
      
      <div className="saved-news-intro__keywords">By keywords:&nbsp;
        <ul className="saved-news-intro__keyword-list list">
          {!showAllKeywords && keywords.length > 3 ?
            keywords.slice(0,2).map((keyword, index) => (
              <li className="saved-news-intro__keyword-item" key={index}>
                <button className="button button_link link saved-news-intro__keyword-button" type="button">{keyword}</button>
              </li>
            ))
            :
            keywords.map((keyword, index) => (
              <li className="saved-news-intro__keyword-item" key={index}>
                <button className="button button_link link saved-news-intro__keyword-button" type="button">{keyword}</button>
              </li>
            ))
          }
        
          {!showAllKeywords && keywords.length > 3 ? 
            <li className="saved-news-intro__keyword-item">
              <button className="button button_link link saved-news-intro__keyword-button saved-news-intro__keyword-button_more" 
                type="button" onClick={() => setShowAllKeywords(true)} aria-label={`show ${keywords.length - 2} more keywords`}>
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