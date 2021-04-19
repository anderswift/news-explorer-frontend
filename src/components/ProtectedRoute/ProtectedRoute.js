import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import CurrentUserContext from '../../contexts/CurrentUserContext'; 


function ProtectedRoute({ component: Component, tokenChecked, ...props  }) {

  const currentUserContext = useContext(CurrentUserContext);


  return (
    <Route>
      {
        () => !tokenChecked ? '' : currentUserContext.isLoggedIn 
          ? <Component {...props} /> 
          : <Redirect to={{ pathname: './', signin: true }} />
      }
    </Route>
  );
}

export default ProtectedRoute; 