import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";

import Note from "./Note";
import MovieRatings from "./MovieRatings";
import MovieActionButtons from "./MovieActionButtons";

const useStyles = makeStyles({
    movieRow: {
        display: 'flex',
        flexDirection: 'row',
    },
    imageColumn: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
});

export default function MediaCard({ watchlistItem, updateWatchlist }) {
    console.log(watchlistItem);
    const classes = useStyles();

    const posterUrl =  `https://image.tmdb.org/t/p/original/${watchlistItem.posterUrl}`;

    const ImageCol = (
        <Grid item xs={4} className={classes.imageColumn}>
            <img style={{width:'50%', borderRadius:'2%'}} src={posterUrl} />
        </Grid>
    );

    const MovieTitleAndActionButtons = (
        <Grid item xs={12}>
            <Grid container >
                <Grid item xs={10}>
                    <Typography variant="h6" color="textSecondary" component="h6">{watchlistItem.title}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <MovieActionButtons watchlistItem={watchlistItem} updateWatchlist={updateWatchlist}/>
                </Grid>
            </Grid>
        </Grid>
    );

    const MovieComment = (
        <Grid item xs={12} style={{paddingRight:'10%', paddingTop:'3%'}}>
            <Note watchlistItem={watchlistItem} updateWatchlist={updateWatchlist}/>
        </Grid>
    );

    const MovieDescription = (
        <Grid item xs={12} style={{paddingRight:'10%'}}>
            <p>{watchlistItem.description}</p>
        </Grid>
    );

    return (
        <Grid container spacing={1} className={classes.movieRow}>
            {ImageCol}
            <Grid item xs={8}>
                <Grid container spacing={1}>
                    {MovieTitleAndActionButtons}
                    <Grid item xs={12} style={{marginTop:'-2%'}}>
                        <MovieRatings watchlistItem={watchlistItem} updateWatchlist={updateWatchlist}/>
                    </Grid>
                    {watchlistItem.watched ? MovieComment : MovieDescription}
                </Grid>
            </Grid>
        </Grid>
    );
}