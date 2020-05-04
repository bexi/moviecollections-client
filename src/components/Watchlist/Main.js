import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import {API_GET} from '../../utils/api-utils'
import WatchlistGrid from './WatchlistGrid';
import SearchWatchlistItem from './SearchWatchlistItem';
import WatchlistList from './WatchlistList';
import WatchlistFilters from "./WatchlistFilters";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.paper.main,
    minHeight: '72vh',
  },
}));

export default (props) => {
  const [watchlistItems, setWatchlistItems] = useState([]);
  const [initialLoad, setInitialLoad] = useState(true);
  const [showListView, setShowListView] = useState(true);

  // TODO: Switch for showing watched/not watched movies
  const [watchedSwitched, setWatchedSwitch] = useState(false);

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
    const items = watchlistItems.filter((item) => {
      if(!watchedSwitched) return (item.watched == watchedSwitched || item.watched == null);
      else return item.watched==watchedSwitched;
    })

    return showListView ?
        <WatchlistList
          watchlistItems={items}
          updateWatchlist={updateWatchlist}
        /> :
        <WatchlistGrid
            watchlistItems={items}
            updateWatchlist={updateWatchlist}
        />;
  }

  // TODO: Loader
  console.log(watchedSwitched);

  const MainContent = (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <SearchWatchlistItem updateWatchlist={updateWatchlist} />
      <WatchlistFilters showListView={showListView} setShowListView={setShowListView} watchedSwitch={watchedSwitched} setWatchedSwitch={setWatchedSwitch}/>
      <div className={classes.paper}>
        {renderWatchlist()}
      </div>
    </Container>
  );
  return ( props.auth.isAuthenticated ? MainContent : <Redirect to='/login'/>);
}