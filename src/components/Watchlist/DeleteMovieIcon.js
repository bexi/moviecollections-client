import React from "react";

import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/DeleteOutlined";

import {API_DELETE} from "../../utils/api-utils";

export default function DeleteMovieIcon({ movieId, updateWatchlist }) {
    const handleDelete = async(event) => {
        event.preventDefault();
        try {
            await API_DELETE(`/usermovie/${movieId}`);
            updateWatchlist();
        } catch (e) {
            alert(e);
        }
    }

    return(<IconButton aria-label="delete" onClick={handleDelete}><MoreVertIcon/></IconButton>);
}