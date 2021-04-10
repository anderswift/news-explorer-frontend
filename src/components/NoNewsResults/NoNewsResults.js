import notFoundImage from '../../images/not-found.svg';
import './NoNewsResults.css';


function NoNewsResults() {

  return (
    <div className="no-news-results">
      <svg className="no-news-results__image">
        <use xlinkHref={`${notFoundImage}#not-found`}></use>
      </svg>
      <h4 className="no-news-results__heading">Nothing Found</h4>
      <p className="no-news-results__p">Sorry, but nothing matched your search terms.</p>
    </div>
  );
}

export default NoNewsResults;