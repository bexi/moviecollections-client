import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import CssBaseline from '@material-ui/core/CssBaseline';

import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.paper.main,
    minHeight: '75vh',
  }
}));

export default function Browse(props) {
    const classes = useStyles();
    const MainContent = (
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Typography variant="h5">
          Coming soon
        </Typography>
        </Container>
    );
    return ( props.isAuthenticated ? MainContent : <Redirect to='/login'/>);}
