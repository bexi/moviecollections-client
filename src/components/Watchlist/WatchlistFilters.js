import React from "react";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import Checkbox from '@material-ui/core/Checkbox';

import {useWatchlistContext} from "./WatchlistContext";
import { GET_WATCHLIST, SET_WATCHED_SWITCH} from "./actions";

const useStyles = makeStyles((theme) => ({
    filterView: {
        marginTop: theme.spacing(2),
    },
    center: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
}));

export default function WatchlistFilters({showListView, setShowListView}) {
    const [{watchedSwitched}, dispatch] = useWatchlistContext();

    const classes = useStyles();

    const handleChange = (event) => {
        dispatch({
            type: SET_WATCHED_SWITCH,
            watchedSwitched: {
                watchlist: !event.target.checked,
                watched: event.target.checked,
                all: false,
            }
        });
    };

    const setShowAll = (checked) => {
        dispatch({
            type: SET_WATCHED_SWITCH,
            watchedSwitched: {
                watchlist: watchedSwitched.watchlist,
                watched: watchedSwitched.watched,
                all: checked,
            }
        });
    }

    // TODO - if "all" --> make switch look grey or similar
    return (
        <Grid container spacing={0} className={classes.filterView}>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
                <Typography component="div">
                    <Grid component="label" container className={classes.center} justify="center" spacing={0}>
                        <Grid item>Watchlist</Grid>
                        <Grid item>
                            <Switch
                                checked={watchedSwitched.watched}
                                onChange={handleChange}
                                name="checkedA"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                        </Grid>
                        <Grid item>Watched</Grid>
                    </Grid>
                </Typography>
            </Grid>
            <Grid item xs={3}>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <Typography component="div">
                            <Checkbox
                                color="secondary"
                                checked={watchedSwitched.all}
                                onChange={(e) => setShowAll(e.target.checked)}
                            />
                            Show All
                        </Typography>
                    </Grid>
                <Grid item xs={6}>
                    <Select
                        id='view-mode'
                        value={showListView}
                        onChange={(e) => setShowListView(e.target.value)}
                        style={{marginTop:'3%'}}
                    >
                        <MenuItem value={false}>Grid View</MenuItem>
                        <MenuItem value={true}>List View</MenuItem>
                    </Select>
                </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
