import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Auth, API } from "aws-amplify";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import AccountCirle from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import AddWatchlistItem from '../components/addItem';
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

function Main(props) {
  const [watchListItems, setWatchListItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addItemCallback, setAddItemCallback] = useState(false);

  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
        return;
      }

      try {
        const items = await loadWatchList();
        setWatchListItems(items);
      } catch (e) {
        alert(e);
      }

        setIsLoading(false);
      }
      onLoad();
  }, [props.isAuthenticated, addItemCallback]);

  function loadWatchList() {
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

  const MainContent = (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <AddWatchlistItem setAddItemCallback={setAddItemCallback} addItemCallback={addItemCallback}/>
      <div className={classes.paper}>
          <Grid container spacing={2}>
            {pairedItems.map((pair) => (
              <Grid item xs={12} className={classes.tableRow}>
                <Grid container spacing={1}>
                  <Grid item xs={6} className={classes.movieRow}><MovieCard title={pair[0].content} /></Grid>
                  { pair[1] && <Grid item xs={6} className={classes.movieRow}><MovieCard title={pair[1].content} /></Grid>}
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
