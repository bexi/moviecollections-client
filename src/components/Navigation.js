import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

import LocalMovies from '@material-ui/icons/LocalMovies';
import LogoutButton from './Logout/LogoutButton';

const Navigation = ({ auth }) => {

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

  const classes = useStyles();

  const AuthedNavMenu = (
    <>
    <Button color="inherit" type='button' href='/browse'>Browse</Button>
    <Button color="inherit" type='button' href='/'>My Movies</Button>
    <LogoutButton auth={auth}/>
    </>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <LocalMovies />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
          <Link style={{color:'inherit', textDecoration:'none'}} href='/'>
            MovieCollections
          </Link>
          </Typography>
          { auth.isAuthenticated && AuthedNavMenu}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navigation;
