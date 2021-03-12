import Navigation from '../Navigation/Navigation';

import './SavedNewsHeader.css';

function SavedNewsHeader() {
  return (
    <header className="header_saved-news">

      <Navigation isSavedNewsHeader={true} />

    </header>
  );
}

export default SavedNewsHeader;