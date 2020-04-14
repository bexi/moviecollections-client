import React from "react";
import { Redirect } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

export default function Browse(props) {
  const MainContent = (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Typography variant="h5">
        Coming soon
      </Typography>
      </Container>
  );
  return ( props.auth.isAuthenticated ? MainContent : <Redirect to='/login'/> );
}
