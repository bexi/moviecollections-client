import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import StarIcon from '@material-ui/icons/Star';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import IconButton from "@material-ui/core/IconButton";

import RatingPopOver from "./Rating";
import DeleteMovieIcon from "./DeleteMovieIcon";
import Note from "./Note";
import {API_PUT} from "../../utils/api-utils";

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
    const [watched, setWatched] = useState(watchlistItem.watched || false);

    const posterUrl =  `https://image.tmdb.org/t/p/original/${watchlistItem.posterUrl}`;

    const setMovieNotWatched = async() => {
        try {
            await API_PUT(`/usermovie/${watchlistItem.movieId}`, { watched: false, note: watchlistItem.note, rating: watchlistItem.rating});
            setWatched(false);
            updateWatchlist();
        } catch (e) {
            // TODO: error message
            alert(e);
        }
    }

    const setMovieWatched = async() => {
        try {
            await API_PUT(`/usermovie/${watchlistItem.movieId}`, { watched: true, note: watchlistItem.note, rating: watchlistItem.rating});
            setWatched(true);
            updateWatchlist();
        } catch (e) {
            // TODO: error message
            alert(e);
        }
    }

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
                <Grid item xs={1}>
                    { watched ?
                        <IconButton onClick={() => setMovieNotWatched()}><CheckBoxIcon/></IconButton> :
                        <IconButton onClick={() => setMovieWatched()}><CheckBoxOutlineBlankIcon/></IconButton>
                }
                </Grid>
                <Grid item xs={1}>
                    <DeleteMovieIcon movieId={watchlistItem.movieId} updateWatchlist={updateWatchlist} /></Grid>
            </Grid>
        </Grid>
    );

    const MovieRating = (
        <Grid item xs={12} style={{marginTop:'-2%'}}>
            <Grid container>
                <Grid item >
                    <IconButton disabled>
                        <Typography variant="body1" style={{display:'inline'}}>IMDB: {watchlistItem.imdbRating}</Typography>
                        <StarIcon />
                    </IconButton></Grid>
                {watched && <Grid item > <RatingPopOver watchlistItem={watchlistItem} fetchedRating={watchlistItem.rating} updateWatchlist={updateWatchlist}/></Grid>}
            </Grid>
        </Grid>
    );

    const MovieComment = (
        <Grid item xs={12} style={{paddingTop:'2%'}}>
            <Note watchlistItem={watchlistItem} fetchedNote={watchlistItem.note} updateWatchlist={updateWatchlist}/>
        </Grid>
    );

    const MovieDescription = (
        <Grid item xs={12} >
            <p>{watchlistItem.description}</p>
        </Grid>
    );

    return (
        <Grid container spacing={1} className={classes.movieRow}>
            {ImageCol}
            <Grid item xs={8}>
                <Grid container spacing={1}>
                    {MovieTitleAndActionButtons}
                    {MovieRating}
                    {watched ? MovieComment : MovieDescription}
                </Grid>
            </Grid>
        </Grid>
    );
}