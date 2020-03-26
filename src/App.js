import React, { useState } from "react";
import Login from './containers/Login';
import LogoutButton from './containers/LogoutButton';
import Routes from './routes';

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  return (
    <div className="App">
      {isAuthenticated ? (<LogoutButton userHasAuthenticated={userHasAuthenticated}/>) : (<div>Signup, Login </div>) }
      <Routes auth={{ isAuthenticated, userHasAuthenticated }}/>
    </div>
  );
}

export default App;
