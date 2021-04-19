function Keywords({ keywords }) {
  return (
    keywords.map((keyword, index) => (
      <li className="saved-news-intro__keyword-item" key={`${keyword.replace(/[^a-zA-Z ]/g, '')}-${index}`}>
        <button className="button button_link link saved-news-intro__keyword-button" type="button">
          {keyword}
        </button>
      </li>
    ))
  );
}

export default Keywords;