import React, {useState} from 'react';
import {API_PUT} from "../../utils/api-utils";
import TextField from "@material-ui/core/TextField";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

export default function Note({watchlistItem, fetchedNote, updateWatchlist}) {
    const [note, setNote] = useState(fetchedNote || null);

    const saveNote = async() => {
        if(note!=null && note.length>=0) {
            try {
                await API_PUT(`/usermovie/${watchlistItem.movieId}`, { watched: watchlistItem.watched, note: note, rating: watchlistItem.rating });
                setNote(note);
                updateWatchlist();
            } catch (e) {
                // TODO: error message
                alert(e);
            }
        }
    }

    return (
        <ClickAwayListener onClickAway={saveNote}>
            <TextField
                id="outlined-multiline-static"
                label="Your movie notes"
                fullWidth
                rows={3}
                variant="outlined"
                multiline
                value={note || ''}
                onChange={(event) => setNote(event.target.value)}
                onKeyDown={(event) => {if(event.key == 'Enter') saveNote()}}
            />
        </ClickAwayListener>
    );
}
