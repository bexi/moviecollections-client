import React, { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import {makeStyles} from "@material-ui/core/styles";
import {fade} from "@material-ui/core/styles/colorManipulator";
import {IMDB_GET} from "../../utils/imdb-api-utils";
import {API_POST} from "../../utils/api-utils";
import Typography from "@material-ui/core/Typography";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const useStyles = makeStyles((theme) => ({
    centerContent: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    dropdown: {
        backgroundColor: fade('rgb(255,255,255)', 0.9),
        [theme.breakpoints.down('sm')]: {
            width:'10%',
        },
        [theme.breakpoints.up('md')]: {
            width:'10%',
        },
        [theme.breakpoints.up('lg')]: {
            width:'50%',
        },
    },
    dropdownItem: {
        backgroundColor: fade(theme.palette.secondary.main, 0)
    },
    watchlistSearch: {
        width:'100%',
        paddingTop: theme.spacing(2),
    },
}));

const SearchWatchlistItem = ({ updateWatchlist }) => {
    const [searchResults, setSearchResults] = useState([]);
    const [searchItem, setSearchItem] = useState('');

    const classes = useStyles();

    const searchImdb = () => {
        const url = 'https://api.themoviedb.org/4/search/movie?&language=en-US&query='
        IMDB_GET(`https://api.themoviedb.org/4/search/movie?&language=en-US&query=${searchItem}`).then((res) => {
            console.log(res);
            setSearchResults(res.data.results.slice(0,5));
        });
    }

    const addWatchlistItemToDB = async(item) => {
        console.log('add item to watchlist');
        try {
            await API_POST('/usermovies', {
                imdbId: item.id,
                title: item.title,
                posterUrl: item['poster_path'],
                description: item['overview'],
                imdbRating: item['vote_average']
            });
            updateWatchlist();
            setSearchItem('');
            setSearchResults([]);
        } catch (e) {
            alert(e);
        }
    }

    const closeMenu = () => {
        setSearchResults([]);
    }

    const searchResultRow = (item) => {
        const posterUrl =  `https://image.tmdb.org/t/p/original/${item['poster_path']}`
        return(
            <ClickAwayListener onClickAway={closeMenu}>
            <Box key={item.id}
                bgcolor="background.paper"
                color="text.primary"
                p={2}
                onClick={() => addWatchlistItemToDB(item)}
                className={classes.dropdownItem}
                borderRadius="borderRadius"
            >
                <Grid container >
                    <Grid item xs={3} > <img style={{width:'30%'}} src={posterUrl} /></Grid>
                    <Grid item xs={9} >
                        <Grid container >
                            <Grid item xs={12}>
                                <Typography component="h5" variant="h5">
                                    {item.title}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <b>Imdb: {item['vote_average']}</b>
                            </Grid>
                            <Grid item xs={12}>
                                Description: {item['overview']}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box></ClickAwayListener>
        );
    }

    const renderSearchResults = () => (
        <Box  position="relative" style={{width:'100%'}}>
            { searchResults.length>0 && <Box
                position="absolute"
                zIndex="modal"
                className={classes.dropdown}
                borderRadius="borderRadius"
                style={{width:'100%', padding:'1%'}}
            >
                {searchResults.map((item) => searchResultRow(item))}
            </Box>}
        </Box>
    );

    return (
        <>
            <div className={classes.centerContent}  >
                <Typography component="h1" variant="h5">
                    Watchlist
                </Typography>
                <TextField
                    id="watchlist-search"
                    variant="outlined"
                    className={classes.watchlistSearch}
                    value={searchItem}
                    onChange={(e) => {
                        setSearchItem(e.target.value);
                        if(searchItem.length>4){
                            searchImdb();
                        }else{
                            setSearchResults([]);
                        }
                    }}
                />
            </div>
            {renderSearchResults()}
        </>
    );
}

export default SearchWatchlistItem;