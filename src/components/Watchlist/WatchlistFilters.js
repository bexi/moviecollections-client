import React from "react";

import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    filterView: {
        marginTop: theme.spacing(2),
    }
}));

export default function WatchlistFilters({showListView, setShowListView}) {
    const classes = useStyles();

    return (
        <Grid container spacing={2} className={classes.filterView}>
            <Grid item xs={10}></Grid>
            <Grid item xs={2}>
                <Select
                    id='view-mode'
                    value={showListView}
                    onChange={(e) => setShowListView(e.target.value)}
                >
                    <MenuItem value={false}>Grid View</MenuItem>
                    <MenuItem value={true}>List View</MenuItem>
                </Select>
            </Grid>
        </Grid>
    );
}
