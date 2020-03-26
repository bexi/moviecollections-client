import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './containers/Login';
import Main from './containers/Main';
import AppliedRoute from "./components/AppliedRoute";

function Routes({ auth }) {
  return (
    <Router>
      <Switch>
        <AppliedRoute exact path="/login" exact component={Login} auth={auth} />
        <AppliedRoute exact path="/" exact component={Main} auth={auth} />
        <Route component={() => (<div>404 not found</div>)} />
      </Switch>
    </Router>
  );
}

export default Routes;
