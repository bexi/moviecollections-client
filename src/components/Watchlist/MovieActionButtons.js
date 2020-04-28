import IconButton from "@material-ui/core/IconButton";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import React from "react";
import Grid from "@material-ui/core/Grid";

import {API_PUT} from "../../utils/api-utils";
import DeleteMovieIcon from "./DeleteMovieIcon";

export default function MovieActionButtons({watchlistItem, updateWatchlist}){

    const setMovieNotWatched = async() => {
        try {
            await API_PUT(`/usermovie/${watchlistItem.movieId}`, { watched: false, note: watchlistItem.note, rating: watchlistItem.rating});
            updateWatchlist();
        } catch (e) {
            // TODO: error message
            alert(e);
        }
    }

    const setMovieWatched = async() => {
        try {
            await API_PUT(`/usermovie/${watchlistItem.movieId}`, { watched: true, note: watchlistItem.note, rating: watchlistItem.rating});
            updateWatchlist();
        } catch (e) {
            // TODO: error message
            alert(e);
        }
    }

    const checkbox = ( watchlistItem.watched ?
                <IconButton onClick={() => setMovieNotWatched()}><CheckBoxIcon/></IconButton> :
                <IconButton onClick={() => setMovieWatched()}><CheckBoxOutlineBlankIcon/></IconButton>
    );

    return (
        <Grid container >
            <Grid item xs={6}>
                {checkbox}
            </Grid>
            <Grid item xs={6}>
                <DeleteMovieIcon movieId={watchlistItem.movieId} updateWatchlist={updateWatchlist} />
            </Grid>
        </Grid>
    );
}