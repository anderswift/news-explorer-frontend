import CardButtons from '../CardButtons/CardButtons';

import '../Link/Link.css';
import '../Button/Button.css';
import './Card.css';


function Card({ card, isSavedNews, openLoginPopup, updateSavedCards, deleteCard, keyword = '' }) {

  const date = new Date(card.publishedAt);
  const formattedDate = `${date.toLocaleString('en-us', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`;


  const truncate = (text, limit)=> {
    if (!text) return '';
    if (text.length < limit) return text;

    const punctuation = ['.', ',', '?', '!'];
    let truncated = text.substring(0, limit);
    truncated = truncated.substring(0, truncated.lastIndexOf(' '));

    if (!punctuation.includes(truncated[truncated.length - 1])) return `${truncated}...`;
    return `${truncated.substring(0, truncated.length - 1)}...`;
  }


  return (
    
    <li className="card">
      <a className="card__link" href={card.url} target="_blank" rel="noreferrer">
        <img className="card__image" src={card.urlToImage} alt={card.name} />
      
        <article className="card__article">
          <header className="card__header">
            <time className="card__date" dateTime={card.publishedAt}>{formattedDate}</time>
            <h3 className="card__title">{truncate(card.title, 60)}</h3>
          </header>
          <p className="card__description">{truncate(card.description, 180)}</p>
          <footer className="card__source">{card.source.name || card.source}</footer>
        </article>
      </a>

      <CardButtons 
        card={card} 
        keyword={keyword}
        isSavedNews={isSavedNews} 
        openLoginPopup={openLoginPopup} 
        updateSavedCards={updateSavedCards} 
        deleteCard={deleteCard} 
      />
    </li>
    
  );
}

export default Card;
