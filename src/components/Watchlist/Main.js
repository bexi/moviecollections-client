import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import WatchlistGrid from './Grid/WatchlistGrid';
import SearchWatchlistItem from './SearchWatchlistItem';
import WatchlistList from './List/WatchlistList';
import WatchlistFilters from "./WatchlistFilters";
import Typography from "@material-ui/core/Typography";
import {useWatchlistContext} from "./WatchlistContext";
import {updateWatchlist} from "./utils";

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
  const [initialLoad, setInitialLoad] = useState(true);
  const [showListView, setShowListView] = useState(true);
  const [{ watchlist, watchedSwitched }, dispatch] = useWatchlistContext();

  const classes = useStyles();

  useEffect(() => {
    const onLoad = async() => {
      if (!props.auth.isAuthenticated) return;
      await updateWatchlist(dispatch);
      setInitialLoad(false);
    }
    onLoad();

  }, [props.auth.isAuthenticated]);

  // TOOD - grid refactor
  const renderWatchlist = () => {
    return( showListView ? <WatchlistList/> : <WatchlistGrid/>);
  }

  const renderTitle = () => {
    let title;
    if(watchedSwitched.watched) title = 'Watched Movies';
    if(watchedSwitched.watchlist) title = 'Watchlist';
    if(watchedSwitched.all) title = 'Your Movies';
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
          <WatchlistFilters showListView={showListView} setShowListView={setShowListView}/>
          {(watchedSwitched.all || watchedSwitched.watchlist) && <SearchWatchlistItem updateWatchlist={() => updateWatchlist(dispatch)} />}
          <div className={classes.paper}>
            {renderWatchlist()}
          </div>
        </Container>
  );
  return ( props.auth.isAuthenticated ? MainContent : <Redirect to='/login'/>);
}