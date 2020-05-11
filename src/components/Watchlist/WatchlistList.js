import React, { useState, useEffect } from "react";

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";

import MovieRow from './MovieRow'
import {useWatchlistContext} from "./WatchlistContext";
import {updateWatchlist} from "./updateWatchlist";

const useStyles = makeStyles((theme) => ({
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

export default () => {
    const [{ watchlist, watchedSwitched }, dispatch] = useWatchlistContext();

    const filteredWatchlist = watchlist.filter((item) => {
      if(watchedSwitched.all) return true;
      if(watchedSwitched.watched) return item.watched==watchedSwitched.watched;
      else return (item.watched == watchedSwitched || item.watched == null);
    })

    const classes = useStyles();

    const NoItems = (
        <Grid item xs={12} className={classes.tableRow}>
            <Typography variant="h6" component="h6">
                Watchlist is empty
            </Typography>
        </Grid>);

    const CardGrid = (filteredWatchlist.map((item, i) => (
        <Grid item xs={12} className={classes.tableRow} key={i}>
            <MovieRow
                watchlistItem={item}
                updateWatchlist={() => updateWatchlist(dispatch)}
            />
        </Grid>
    )));

    return (
        <Grid container spacing={2}>
            {filteredWatchlist.length>0 ? CardGrid : NoItems}
        </Grid>
    );
}