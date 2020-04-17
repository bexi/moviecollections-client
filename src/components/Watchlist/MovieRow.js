import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Slider from '@material-ui/core/Slider';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import IconButton from "@material-ui/core/IconButton";

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
    },
});

export default function MediaCard({ watchlistItem, updateWatchlist, watched }) {
    const classes = useStyles();
    const posterUrl =  `https://image.tmdb.org/t/p/original/${watchlistItem.posterUrl}`

    const ImageCol = (
        <Grid item xs={4} className={classes.imageColumn}>
            <img style={{width:'50%', borderRadius:'2%'}} src={posterUrl} />
        </Grid>
    );

    const MovieRowNotWatched = (
        <Grid container spacing={1} className={classes.movieRow}>
            {ImageCol}
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

    const MovieTitleAndActionButtons = (
        <Grid item xs={12}>
            <Grid container >
                <Grid item xs={10}>
                    <Typography variant="h6" color="textSecondary" component="h6">{watchlistItem.title}</Typography>
                </Grid>
                <Grid item xs={1}>
                    <IconButton><CheckBoxIcon /></IconButton>
                </Grid>
                <Grid item xs={1}>
                    <DeleteMovieIcon movieId={watchlistItem.movieId} updateWatchlist={updateWatchlist} /></Grid>
            </Grid>
        </Grid>
    );

    const MovieRating = (
        <Grid item xs={12} style={{marginTop:'-2%'}}>
            <Grid container spacing={1}>
                <Grid item style={{paddingRight:'0%'}}><StarIcon /></Grid>
                <Grid item style={{marginTop:'1%', paddingLeft:'0%'}}>{watchlistItem.imdbRating}</Grid>
                <Grid item ><Typography variant="h5" color="textSecondary" component="h5" style={{display:'inline'}}> | </Typography></Grid>
                <Grid item > <StarBorderIcon /></Grid>
            </Grid>
        </Grid>
    );

    const MovieComment = (
        <Grid item xs={12} style={{paddingTop:'2%'}}>
            <TextField
                id="outlined-multiline-static"
                label="Your movie notes"
                fullWidth
                multiline
                rows={3}
                defaultValue="What is your thoughts about this movie?"
                variant="outlined"
            />
        </Grid>
    );
    // TODO -- "more info" icon which shows e.g. movie description
    // TODO -- watched or not
    // TODO -- rating -- popover
    // TODO -- comment update
    const MovieRowWatched = (
        <Grid container spacing={1} className={classes.movieRow}>
            {ImageCol}
            <Grid item xs={8}>
                <Grid container spacing={1}>
                    {MovieTitleAndActionButtons}
                    {MovieRating}
                    {MovieComment}
                </Grid>
            </Grid>
        </Grid>
    );

    return watched ? MovieRowWatched : MovieRowNotWatched;
}