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

  const USER_ALREADY_EXIST_ERROR = 'UsernameExistsException';
  const ERROR_NO_AUTH = 'NotAuthorizedException';

  const handleSubmit = async(event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await Auth.signIn(email, password);
      auth.userHasAuthenticated(true);
      history.push('/');
      setIsLoading(false);
    } catch (e) {
      console.log(e);
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
  // TODO
  /*const RememberMe = (
    <FormControlLabel
      control={<Checkbox value="remember" color="primary" />}
      label="Remember me"
    />
  );*/
  const resendVerificationCode = () => {
    Auth.resendSignUp(email).then(() => {
      const state = { 'email': email, 'password': password };
      history.push('/signup/verify', state);
      setErrorCode(null);
    }).catch(e => {
      alert(e);
    });
  }

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
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isLoading}
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
        {errorCode==USER_ALREADY_EXIST_ERROR &&
          <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={() => resendVerificationCode()}
          >
            Resend verification code to email
          </Button>}
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );

  return auth.isAuthenticated ? (<Redirect to='/' />) : LoginForm ;
}
