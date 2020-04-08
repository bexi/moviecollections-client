import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Auth } from "aws-amplify";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import AccountCirle from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import SignupConfirmation from './SignupConfirmation';
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp( props ) { // { auth, history }
  console.log('signup props: ', props);
  const auth = props.auth;
  const history = props.history;

  const [showConfirmed, setShowConfirmed] = useState(false);
  const [errorCode, setErrorCode] = useState(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [loading, setLoading] = useState(false);

  const USER_ALREADY_EXIST_ERROR = 'UsernameExistsException';
  const INVALID_PASSWORD_ERROR = 'InvalidParameterException';
  const PASSWORDS_NOT_MATCH_ERROR = 'PasswordsDoesNotMatchException';

  const classes = useStyles();

  const validateForm = () => {
    return (
      email.length > 0 &&
      password.length > 0 &&
      password === passwordConfirm
    );
  }

  const submit = async(e) => {
    e.preventDefault();

    if(!validateForm()) {
      setErrorCode(PASSWORDS_NOT_MATCH_ERROR);
      return;
    }

    setLoading(true);

    try {
      const newUser = await Auth.signUp({
        username: email,
        password: password
      });
      setLoading(false);
      setShowConfirmed(true);

    } catch (e) {
      console.log(e);
      setErrorCode(e.name);
      setLoading(false);
    }
  }

  const getPasswordHelpText = () => {
    if (errorCode == PASSWORDS_NOT_MATCH_ERROR) return 'Passwords does not match';
    if (errorCode == INVALID_PASSWORD_ERROR) return 'Password does not match the critieras';
  }

  const SignupForm = (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCirle />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={submit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                  setErrorCode(null);
                }}
                error={ errorCode == USER_ALREADY_EXIST_ERROR }
                helperText={errorCode == USER_ALREADY_EXIST_ERROR && 'Account with that email already exist. Need to resend verification code to email?'}
              />
            </Grid>
            <Grid item xs={12}>
                Passwords must be at least 8 characters in length. <br/>
                A minimum of 1 upper case letter and special character.
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
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
                error={ errorCode == PASSWORDS_NOT_MATCH_ERROR || errorCode == INVALID_PASSWORD_ERROR }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Confirm Password"
                type="password"
                id="passwordConfirm"
                autoComplete="current-password"
                value={passwordConfirm}
                onChange={e => {
                  setPasswordConfirm(e.target.value);
                  setErrorCode(null);
                }}
                error={ errorCode == PASSWORDS_NOT_MATCH_ERROR || errorCode == INVALID_PASSWORD_ERROR }
                helperText={getPasswordHelpText()}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );

  console.log('error code: ', errorCode);
  return auth.isAuthenticated ?
      (<Redirect to='/' />) :
      (showConfirmed ?
          <SignupConfirmation email={email} password={password} userHasAuthenticated={auth.userHasAuthenticated} history={history} /> :
          SignupForm
      );
}
