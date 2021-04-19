import Navigation from '../Navigation/Navigation';
import SavedNewsIntro from '../SavedNewsIntro/SavedNewsIntro';

import './SavedNewsHeader.css';


function SavedNewsHeader({ logout, openLoginPopup }) {

  return (
    <header className="header header_scheme_light">

      <Navigation isSavedNewsHeader={true} logout={logout} openLoginPopup={openLoginPopup} />

      <SavedNewsIntro />

    </header>
  );
}

export default SavedNewsHeader;