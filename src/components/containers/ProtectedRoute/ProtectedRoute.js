import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import Preloader from "../../Preloader/Preloader";//Прелоудер

function ProtectedRoute ({component: Component, ...props}) {
    return (
  <Route path={props.path} exact>
    {
    props.isCheking === "loading" ? 
      <Preloader />
    :
    ()=>
      props.loggedIn ? 
        props.path != "/" ?  
          <Component {...props} /> 
          : <Redirect to="/movie" /> 
      : <Redirect to="/main" />
    }
  </Route>
  )
}

export default ProtectedRoute;