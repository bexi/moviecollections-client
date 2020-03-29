import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Navigation from './containers/Navigation';
import Routes from './routes';

function App() {
  const debug = false;
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(debug);

  const onLoad = async () => {
      try{
        await Auth.currentSession();
        userHasAuthenticated(true);
      }
      catch(e){
        if(e !== 'No current user') alert(e);
      }
      setIsAuthenticating(false);
  }

  useEffect(() => {
    onLoad();
  }, []);

  const theme = createMuiTheme({
    palette: {
      primary: {main: '#424242'},
      secondary: {main: '#009688'},
      paper: {main: '#eeeeee'}
    }
  });

  const Loading = (<div>Loading Auth</div>);
  const AppContent = (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Navigation auth={{ isAuthenticated, userHasAuthenticated }}/>
        <Routes auth={{ isAuthenticated, userHasAuthenticated }}/>
      </ThemeProvider>
    </div>);
  return ( isAuthenticating ? Loading : AppContent);
}

export default App;
