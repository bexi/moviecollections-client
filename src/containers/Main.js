import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { API } from "aws-amplify";

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
//import AccountCirle from '@material-ui/icons/AccountCircle';
//import Switch from '@material-ui/core/Switch';

import AddWatchlistItem from '../components/AddItem';
import MovieCard from '../components/MovieCard'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.paper.main,
    minHeight: '75vh',
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
  tableRow: {
    margin: theme.spacing(1, 1, 0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  movieRow: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const Main = (props) => {
  const [watchListItems, setWatchListItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addItemCallback, setAddItemCallback] = useState(false);
  const [deletingCallback, setDeletingCallback] = useState(false);
  /*const [state, setState] = useState({
    checkedA: true,
    checkedB: true,
  });*/

  useEffect(() => {
    const onLoad = async() => {
      if (!props.isAuthenticated) return;
      try {
        const items = await loadWatchList();
        setWatchListItems(items);
      } catch (e) {
        alert(e);
      }
      setIsLoading(false);
    }
    onLoad();
  }, [props.isAuthenticated, addItemCallback, deletingCallback]);

  const loadWatchList = () => {
    return API.get("moviecollections-api", "/usermovies");
  }

  const pairWatchlistItems = (items) => {
    let paired = [];
    for(let i=0; i < (items.length ); i=i+2){
      paired[i] = [items[i], items[i+1]];
    }
    return paired;
  }

  const pairedItems = pairWatchlistItems(watchListItems);

  const classes = useStyles();

  /*const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const WatchlistSwitch = (
    <Grid item xs={12} className={classes.tableRow} >
      <Grid component="label" container alignItems="center" spacing={1} className={classes.tableRow}>
        <Grid item>Watchlist</Grid>
        <Grid item>
          <Switch
          checked={state.checkedA}
          onChange={handleChange}
          name="checkedA"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
        </Grid>
        <Grid item>Seen movies</Grid>
      </Grid>
    </Grid>
  );*/

  const MainContent = (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <AddWatchlistItem setAddItemCallback={setAddItemCallback} addItemCallback={addItemCallback}/>
      <div className={classes.paper}>
          <Grid container spacing={2}>

            {pairedItems.map((pair, i) => (
              <Grid item xs={12} className={classes.tableRow} key={i}>
                <Grid container spacing={1}>
                  <Grid item xs={6} className={classes.movieRow}>
                    <MovieCard
                      title={pair[0].content}
                      movieId={pair[0].movieId}
                      deletingCallback={deletingCallback}
                      setDeletingCallback={setDeletingCallback}
                      />
                  </Grid>
                  { pair[1] && <Grid item xs={6} className={classes.movieRow}>
                    <MovieCard
                      title={pair[1].content}
                      movieId={pair[0].movieId}
                      deletingCallback={deletingCallback}
                      setDeletingCallback={setDeletingCallback}
                      />
                    </Grid>}
                </Grid>
              </Grid>
            ))}
          </Grid>
      </div>
    </Container>
  );
  return ( props.isAuthenticated ? MainContent : <Redirect to='/login'/>);
}

export default Main;
