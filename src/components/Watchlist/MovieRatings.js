import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import StarIcon from "@material-ui/icons/Star";
import RatingPopOver from "./Rating";
import React from "react";

export default function MovieRatings ({watchlistItem, updateWatchlist}) {
    console.log(watchlistItem);
    return (
        <Grid container>
            <Grid item >
                <IconButton disabled style={{paddingLeft:0}}>
                    <Typography variant="body1" style={{display:'inline'}}>IMDB: {watchlistItem.imdbRating}</Typography>
                    <StarIcon />
                </IconButton></Grid>
            {watchlistItem.watched && <Grid item > <RatingPopOver watchlistItem={watchlistItem} fetchedRating={watchlistItem.rating} updateWatchlist={updateWatchlist}/></Grid>}
        </Grid>
    );
}