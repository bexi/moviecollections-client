import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { API } from "aws-amplify";

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
//import Switch from '@material-ui/core/Switch';

import AddWatchlistItem from '../components/AddWatchlistItem';
import WatchlistGrid from './WatchlistGrid';

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

export default (props) => {
  const [watchlistItems, setWatchlistItems] = useState([]);
  const [initialLoad, setInitialLoad] = useState(true);
  /*const [state, setState] = useState({
    checkedA: true,
    checkedB: true,
  });*/

  const classes = useStyles();

  useEffect(() => {
    const onLoad = async() => {
      if (!props.isAuthenticated) return;
      await updateWatchlist();
      setInitialLoad(false);
    }
    onLoad();
  }, [props.isAuthenticated]);

  const loadWatchList = () => {
    return API.get("moviecollections-api", "/usermovies");
  }

  const updateWatchlist = async() => {
    try {
      const items = await loadWatchList();
      setWatchlistItems(items);
    } catch (e) {
      alert(e);
    }
  }

  const pairwatchlistItems = (items) => {
    let paired = [];
    for(let i=0; i < (items.length ); i=i+2){
      paired[i] = [items[i], items[i+1]];
    }
    return paired;
  }

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
      <AddWatchlistItem updateWatchlist={updateWatchlist}/>
      <div className={classes.paper}>
        <WatchlistGrid
            watchlistItems={watchlistItems}
            updateWatchlist={updateWatchlist}
        />
      </div>
    </Container>
  );

  return ( props.isAuthenticated ? MainContent : <Redirect to='/login'/>);
}