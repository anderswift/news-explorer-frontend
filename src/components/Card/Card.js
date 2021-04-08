import CardButton from '../CardButton/CardButton';


import '../Link/Link.css';
import './Card.css';

function Card({ card }) {

  const date = new Date(card.publishedAt);
  const formattedDate = 
    date.toLocaleString('en-us', { month: 'long' }) + ' ' 
    + date.getDate() + ', ' 
    + date.getFullYear();
  


  function truncate(text, limit) {
    if(text.length < limit) return text;
    else {
      let truncated = text.substring(0, limit);
      const punctuation = ['.', ',', '?', '!'];
      truncated = truncated.substring(0, truncated.lastIndexOf(' '));

      if (!punctuation.includes(truncated[truncated.length-1])) return truncated + '...';
      else return truncated.substring(0, truncated.length-1) + '...';
    }
  }


  return (
    <li className="card">
      <CardButton icon="save" isSaved={true} />

      <img className="card__image" src={card.urlToImage} alt={card.name}  />
      <article className="card__article">
        <header className="card__header">
          <time className="card__date" dateTime={card.publishedAt}>{formattedDate}</time>
          <a className="card__link link" href={card.url}>
            <h3 className="card__title">{truncate(card.title, 60)}</h3>
          </a>
        </header>
        <p className="card__description">{truncate(card.description, 180)}</p>
        <footer className="card__source">{card.source.name}</footer>
      </article>
    </li>
  );
}

export default Card;