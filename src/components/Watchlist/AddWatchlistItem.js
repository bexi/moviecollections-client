import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { API_POST } from "../../utils/api-utils";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 3),
  },
}));

const AddWatchlistItem = ( { updateWatchlist} ) => {
  const [isLoading, setIsLoading] = useState(false);
  const [watchlistItem, setWatchlistItem] = useState('');

  const classes = useStyles();

  const handleSubmit = async(event) => {
    event.preventDefault();
    if(watchlistItem === '') return;
    setIsLoading(true);

    try {
      await API_POST('/usermovies', { content: watchlistItem });
      updateWatchlist();
      setWatchlistItem('');
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }

  const AddWatchlistItem = (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Add movie or serie to your watchlist
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={9}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="watchlistItem"
              label="Watchlist item"
              name="watchlistItem"
              autoFocus
              onChange={e => setWatchlistItem(e.target.value)}
              value={watchlistItem}
            />
            </Grid>
            <Grid item xs={3}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Add Movie
            </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );

  return AddWatchlistItem ;
}

export default AddWatchlistItem;
