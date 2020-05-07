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
import Typography from "@material-ui/core/Typography";

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
  const [watchedSwitched, setWatchedSwitch] = useState({
    watchlist:true,
    watched: false,
    all: true
  });

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
      if(watchedSwitched.all) return true;
      if(watchedSwitched.watched) return item.watched==watchedSwitched.watched;
      else return (item.watched == watchedSwitched || item.watched == null);
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

  const renderTitle = () => {
    let title = watchedSwitched ? 'Watched Movies' : 'Watchlist';
    return(
        <Typography component="h1" variant="h5" style={{textAlign:'center', paddingTop:'2%'}}>
          {title}
        </Typography>)
  }

  // TODO: Loader
  const MainContent = (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      {renderTitle()}
      <WatchlistFilters showListView={showListView} setShowListView={setShowListView} watchedSwitch={watchedSwitched} setWatchedSwitch={setWatchedSwitch}/>
      {(watchedSwitched.all || watchedSwitched.watchlist) && <SearchWatchlistItem updateWatchlist={updateWatchlist} />}
      <div className={classes.paper}>
        {renderWatchlist()}
      </div>
    </Container>
  );
  return ( props.auth.isAuthenticated ? MainContent : <Redirect to='/login'/>);
}