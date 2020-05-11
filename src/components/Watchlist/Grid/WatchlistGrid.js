import React, { useState, useEffect } from "react";

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";

import MovieCard from './MovieCard'
import {useWatchlistContext} from "../WatchlistContext";
import {updateWatchlist, filterWatchlist} from "../utils";

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

const pairwatchlistItems = (items) => {
    let paired = [];
    for(let i=0; i < (items.length ); i=i+2){
        paired[i] = [items[i], items[i+1]];
    }
    return paired;
}

export default () => {
    const [{ watchlist, watchedSwitched }, dispatch] = useWatchlistContext();
    const filteredWatchlist = filterWatchlist(watchlist, watchedSwitched);
    // each row should contain two movie cards (for now)
    const pairedItems = pairwatchlistItems(filteredWatchlist);
    const classes = useStyles();

    const NoItems = (
        <Grid item xs={12} className={classes.tableRow}>
            <Typography variant="h6" component="h6">
                Watchlist is empty
            </Typography>
        </Grid>);

    const CardGrid = (pairedItems.map((pair, i) => (
        <Grid item xs={12} className={classes.tableRow} key={i}>
            <Grid container spacing={1}>
                { pair[0] && <Grid item xs={6} className={classes.movieRow}>
                    <MovieCard
                        watchlistItem={pair[0]}
                        updateWatchlist={() => updateWatchlist(dispatch)}
                    /></Grid>}
                { pair[1] && <Grid item xs={6} className={classes.movieRow}>
                    <MovieCard
                        watchlistItem={pair[1]}
                        updateWatchlist={() => updateWatchlist(dispatch)}
                    />
                </Grid>}
            </Grid>
        </Grid>
    )));

    return (
        <Grid container spacing={2}>
            {watchlist.length>0 ? CardGrid : NoItems}
        </Grid>
    );
}