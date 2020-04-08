import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './containers/Login';
import Signup from './containers/Signup';
import Main from './containers/Main';
import Browse from './containers/Browse';
import AppliedRoute from "./components/AppliedRoute";

function Routes(props) {
    console.log('router props', props);
    const auth = props.auth;
  return (
    <Router>
      <Switch>
        <Route exact path="/login" render={(props) => <Login {...props} auth={auth}/>}/>
        <Route exact path="/signup" render={(props) => <Signup {...props} auth={auth}/>}/>
        <Route exact path="/browse" render={(props) => <Browse {...props} auth={auth}/>}/>
        <Route exact path="/" render={(props) => <Main {...props} auth={auth}/>} />
        <Route component={() => (<div>404 not found</div>)} />
      </Switch>
    </Router>
  );
}

export default Routes;
