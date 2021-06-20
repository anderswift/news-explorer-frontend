import { useState, useContext } from 'react';

import CurrentUserContext from '../../contexts/CurrentUserContext';

import Keywords from '../Keywords/Keywords';

import '../List/List.css';
import '../Button/Button.css';
import '../Link/Link.css';
import '../PageSection/PageSection.css';
import './SavedNewsIntro.css';


function SavedNewsIntro() {

  const currentUserContext = useContext(CurrentUserContext);
  const [showAllKeywords, setShowAllKeywords] = useState(false);
  const defaultNumberKeywordLinksShown = 3;


  return (
    <div className="saved-news-intro page-section">
      <h1 className="saved-news-intro__title">Saved articles</h1>
      
      <h2 className="saved-news-intro__count">
        {`${currentUserContext.currentUser.name}, 
        you have ${currentUserContext.savedCards.length || 0} 
        saved ${currentUserContext.savedCards.length === 1 ? 'article' : 'articles'}`}
      </h2>

      {currentUserContext.savedCardKeywords.length !== 0 ?
        <div className="saved-news-intro__keywords">
          By keywords:&nbsp;
          <ul className="saved-news-intro__keyword-list list">

            <Keywords keywords={!showAllKeywords && currentUserContext.savedCardKeywords.length > defaultNumberKeywordLinksShown 
              ? currentUserContext.savedCardKeywords.slice(0, defaultNumberKeywordLinksShown - 1)
              : currentUserContext.savedCardKeywords} 
            />
          
            {!showAllKeywords && currentUserContext.savedCardKeywords.length > defaultNumberKeywordLinksShown 
              ? 
              <li className="saved-news-intro__keyword-item">
                <button className="button button_link link saved-news-intro__keyword-button saved-news-intro__keyword-button_more" 
                  type="button" onClick={() => setShowAllKeywords(true)} aria-label={`show ${currentUserContext.savedCardKeywords.length - defaultNumberKeywordLinksShown + 1} more keywords`}>
                    and {currentUserContext.savedCardKeywords.length - defaultNumberKeywordLinksShown + 1} more
                </button>
              </li>
              : 
              null}

          </ul>
        </div>

        : null}
    </div>
  );
}

export default SavedNewsIntro;