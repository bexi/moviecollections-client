import React from "react";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";

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

export default function WatchlistFilters({showListView, setShowListView, watchedSwitch, setWatchedSwitch}) {
    const classes = useStyles();

    /*const [state, setState] = React.useState({
        checkedA: true,
        checkedB: false,
    });*/

    const handleChange = (event) => {
        //setState({ ...state, [event.target.name]: event.target.checked });
        setWatchedSwitch(event.target.checked);
    };

    return (
        <Grid container spacing={0} className={classes.filterView}>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
                <Typography component="div">
                    <Grid component="label" container className={classes.center} justify="center" spacing={0}>
                        <Grid item>Watchlist</Grid>
                        <Grid item>
                            <Switch
                                checked={watchedSwitch}
                                onChange={handleChange}
                                name="checkedA"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />                    </Grid>
                        <Grid item>Watched</Grid>
                    </Grid>
                </Typography>            </Grid>
            <Grid item xs={4}>
                <Grid container>
                <Grid item xs={6}/>
                <Grid item xs={6}>
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
            </Grid>
        </Grid>
    );
}
