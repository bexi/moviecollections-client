import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Auth } from "aws-amplify";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import AccountCirle from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.paper.main,
    minHeight: '85vh',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  movieRow: {
    minHeight: '100px',
    height: '15vh',
    margin: theme.spacing(1, 1, 0),
    backgroundColor:'red',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

function Main(props) {
  const classes = useStyles();

  console.log(props);
  const MainContent = (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={12} className={classes.movieRow}>
              <Box height="100%" style={{alignText: 'center'}}>Movie 1</Box>
            </Grid>
            <Grid item xs={12} className={classes.movieRow}>
              Movie 2
            </Grid>
            <Grid item xs={12} className={classes.movieRow}>
              Movie 3
            </Grid>
          </Grid>
      </div>
    </Container>
  );
  return ( props.isAuthenticated ? MainContent : <Redirect to='/login'/>);
}

export default Main;
