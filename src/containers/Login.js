import React, { useState } from "react";
import {Redirect} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/VpnKey';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Auth } from "aws-amplify";

import Copyright from '../components/Copyright';
import AwsErrors from '../utils/aws-errors';
import VerifyEmailButton from "../components/VerifyEmailButton";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login( { auth, history } ) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorCode, setErrorCode] = useState(null);

  const classes = useStyles();

  const handleSubmit = async(event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await Auth.signIn(email, password);
      auth.userHasAuthenticated(true);
      history.push('/');
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setErrorCode(e.code);
    }
  }

  // TODO
  /*const ForgotPassword = (
    <Link href="#" variant="body2">
      Forgot password?
    </Link>
  );*/

  const LoginForm = (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              setErrorCode(null);
            }}
            error={ errorCode != null }
            helperText={errorCode}
          />
          {errorCode==AwsErrors.USER_NOT_CONFIRMED &&
          <VerifyEmailButton history={history} user={{email: email, password: password}} setErrorCode={setErrorCode}/>}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={e => {
              setPassword(e.target.value);
              setErrorCode(null);
            }}
            error={ errorCode != null }
            helperText={errorCode}
            disabled={errorCode == AwsErrors.USER_NOT_CONFIRMED}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isLoading || (errorCode ==  AwsErrors.USER_NOT_CONFIRMED)}
          >
            {isLoading ?  <CircularProgress color="secondary" size={25} /> : 'Sign In'}
          </Button>
          <Grid container>
            <Grid item xs>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );

  return auth.isAuthenticated ? (<Redirect to='/' />) : LoginForm ;
}
