import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';

import { fade } from '@material-ui/core/styles/colorManipulator';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
//import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Box from '@material-ui/core/Box';

import {API_GET} from '../utils/api-utils'
import AddWatchlistItem from '../components/AddWatchlistItem';
import WatchlistGrid from './WatchlistGrid';
import {IMDB_GET} from '../utils/imdb-api-utils';
import SearchWatchlistItem from '../components/SearchWatchlistItem';

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
  //const [searchItem, setSearchItem] = useState('');
  //const [searchResults, setSearchResults] = useState([]);
  const [image, setImage] = useState(null);

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

  const updateWatchlist = async() => {
    try {
      const items = await API_GET('/usermovies');
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
      <SearchWatchlistItem updateWatchlist={updateWatchlist} />
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