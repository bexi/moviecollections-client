import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
//import Switch from '@material-ui/core/Switch';

import {API_GET} from '../utils/api-utils'
import WatchlistGrid from './WatchlistGrid';
import SearchWatchlistItem from '../components/SearchWatchlistItem';
import WatchlistList from '../components/WatchlistList';

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
  const [showListView, setShowListView] = useState(false);

  // TODO: Switch for showing watched/not watched movies
  /*const [state, setState] = useState({
    checkedA: true,
    checkedB: true,
  });*/

  const classes = useStyles();

  useEffect(() => {
    const onLoad = async() => {
      if (!props.auth.isAuthenticated) return;
      await updateWatchlist();
      setInitialLoad(false);
    }
    onLoad();
  }, [props.auth.isAuthenticated]);

  const updateWatchlist = async() => {
    try {
      const items = await API_GET('/usermovies');
      setWatchlistItems(items);
    } catch (e) {
      // TODO: fix error message for user
      alert(e);
    }
  }

  const renderWatchlist = () => {
    return showListView ?
        <WatchlistList
          watchlistItems={watchlistItems}
          updateWatchlist={updateWatchlist}
        /> :
        <WatchlistGrid
            watchlistItems={watchlistItems}
            updateWatchlist={updateWatchlist}
        />;
  }

  console.log(showListView);
  // TODO: Loader
  const MainContent = (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <SearchWatchlistItem updateWatchlist={updateWatchlist} />
      <div className={classes.paper}>
        {renderWatchlist()}
      </div>
    </Container>
  );
  return ( props.auth.isAuthenticated ? MainContent : <Redirect to='/login'/>);
}