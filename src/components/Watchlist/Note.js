import React, {useState} from 'react';
import {API_PUT} from "../../utils/api-utils";
import TextField from "@material-ui/core/TextField";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

export default function Note({id, fetchedNote, updateWatchlist}) {
    const [note, setNote] = useState(fetchedNote || null);

    const saveNote = async() => {
        if(note!=null && note.length>0) {
            try {
                let res = await API_PUT(`/usermovie/${id}`, { note: note});
                console.log(res);
                setNote(note);
                updateWatchlist();
            } catch (e) {
                // TODO: error message
                alert(e);
            }
        }
    }
//setNote(event.target.value)
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
