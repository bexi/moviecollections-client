import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import SignupConfirmation from './components/VerifyEmail/SignupConfirmation';
import Main from './components/Watchlist/Main';
import Browse from './components/Browse';
import AppliedRoute from "./components/AppliedRoute";
import WatchlistContextWrapper from "./components/Watchlist/WatchlistContextWrapper";

function Routes(props) {
    console.log('router props', props);
    const auth = props.auth;
  return (
    <Router>
      <Switch>
        <Route exact path="/login" render={(props) => <Login {...props} auth={auth}/>}/>
        <Route exact path="/signup" render={(props) => <Signup {...props} auth={auth}/>}/>
        <Route exact path="/signup/verify" render={(props) => <SignupConfirmation {...props} auth={auth}/>}/>
        <Route exact path="/browse" render={(props) => <Browse {...props} auth={auth}/>}/>
        <Route exact path="/" render={(props) => <WatchlistContextWrapper {...props} auth={auth}/>} />
        <Route component={() => (<div>404 not found</div>)} />
      </Switch>
    </Router>
  );
}

export default Routes;
