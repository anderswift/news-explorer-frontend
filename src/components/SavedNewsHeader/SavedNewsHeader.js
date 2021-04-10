import Navigation from '../Navigation/Navigation';
import SavedNewsIntro from '../SavedNewsIntro/SavedNewsIntro';


import './SavedNewsHeader.css';

function SavedNewsHeader({ cardCount, logout, openLoginPopup }) {

  const keywords = ['nature','Yellowstone','travel','pandemic'];


  return (
    <header className="header header_saved-news">

      <Navigation isSavedNewsHeader={true} logout={logout} openLoginPopup={openLoginPopup} />

      <SavedNewsIntro keywords={keywords} cardCount={4} />

    </header>
  );
}

export default SavedNewsHeader;