import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";

import DeleteMovieIcon from "./DeleteMovieIcon";

const useStyles = makeStyles({
    movieRow: {
        display: 'flex',
        flexDirection: 'row',
    },
    imageColumn: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
});

export default function MediaCard({ watchlistItem, updateWatchlist }) {
    const classes = useStyles();
    const posterUrl =  `https://image.tmdb.org/t/p/original/${watchlistItem.posterUrl}`

    return (
        <Grid container spacing={1} className={classes.movieRow}>
            <Grid item xs={4} className={classes.imageColumn}>
                <img style={{width:'50%', borderRadius:'2%'}} src={posterUrl} />
            </Grid>
            <Grid item xs={7} >
                <Typography variant="h6" color="textSecondary" component="h6" >{watchlistItem.title}</Typography>
                <p><b>Imdb Rating: </b> {watchlistItem.imdbRating}</p>
                <p>{watchlistItem.description}</p>
            </Grid>
            <Grid item xs={1}>
                <DeleteMovieIcon movieId={watchlistItem.movieId} updateWatchlist={updateWatchlist} />
            </Grid>
        </Grid>
    );
}