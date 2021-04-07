import CardButton from '../CardButton/CardButton';


import '../Link/Link.css';
import './Card.css';

function Card({ card }) {

  const date = new Date(card.publishedAt);
  const formattedDate = 
    date.toLocaleString('en-us', { month: 'long' }) + ' ' 
    + date.getDate() + ', ' 
    + date.getFullYear();


  return (
    <li className="card">
      <CardButton icon="save" isSaved={true} />

      <img className="card__image" src={card.urlToImage} alt={card.name}  />
      <article className="card__article">
        <header className="card__header">
          <time className="card__date" dateTime={card.publishedAt}>{formattedDate}</time>
          <a className="card__link link" href={card.url}>
            <h3 className="card__title">{card.title}</h3>
          </a>
        </header>
        <p className="card__description">{card.description}</p>
        <footer className="card__source">{card.source.name}</footer>
      </article>
    </li>
  );
}

export default Card;