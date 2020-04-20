import React, {useState} from 'react';
import Popover from '@material-ui/core/Popover';
import StarBorderIcon from "@material-ui/icons/StarBorder";
import IconButton from "@material-ui/core/IconButton";
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import StarIcon from '@material-ui/icons/Star';
import Typography from "@material-ui/core/Typography";
import {API_PUT} from "../../utils/api-utils";

export default function RatingPopOver({id, fetchedRating, updateWatchlist}) {
    const [anchorEl, setAnchorEl] = React.useState( null);
    const [rating, setRating] = useState(fetchedRating || null);

    const handleClick = async(event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    console.log('rating:',rating);
    return (
        <div>
            <IconButton aria-describedby={'rating-button'} onClick={handleClick}>
                <Typography variant="body1"  style={{display:'inline'}}>{rating ? rating : 'Rate'}</Typography>
                {rating ? <StarIcon /> : <StarBorderIcon/>}
            </IconButton>
            <Popover
                id={open ? 'rating-popover' : undefined}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                PaperProps={{style:{backgroundColor:'rgba(255,255,255)'}}}
            >
                <Box style={{width:'270px', height:'50px', padding:'5%'}}>
                    <Rating
                        name="simple-controlled"
                        max={10}
                        value={rating}
                        onChange={async(event, newValue) => {
                            if(newValue!=-1) {
                                try {
                                    let res = await API_PUT(`/usermovie/${id}`, { rating: newValue});
                                    setRating(newValue);
                                    updateWatchlist();
                                } catch (e) {
                                    // TODO: error message
                                    alert(e);
                                }
                            }
                        }}
                    />
                </Box>
            </Popover>
        </div>
    );
}
