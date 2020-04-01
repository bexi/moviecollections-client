import React, {useState} from "react";
import {Auth} from "aws-amplify";

import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import AccountCirle from "@material-ui/icons/AccountCircle";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";

import Copyright from "../components/Copyright";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const ConfirmationForm = ({email, password, history, userHasAuthenticated}) => {
    const [confirmationCode, setConfirmationCode] = useState('');

    const classes = useStyles();

    const submitConfirmation = async(e) => {
        e.preventDefault();
        //setLoading(true);
        try {
            await Auth.confirmSignUp(email, confirmationCode);
            await Auth.signIn(email, password);

            userHasAuthenticated(true);
            history.push("/");
        } catch (e) {
            alert(e.message);
            //setLoading(false);
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <AccountCirle />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} onSubmit={submitConfirmation}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            If you leave this page you will have to re-register and get a new code.
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="confirmationCode"
                                variant="outlined"
                                required
                                fullWidth
                                id="confirmationCode"
                                label="Confirmation Code from email"
                                autoFocus
                                value={confirmationCode}
                                onChange={(e) => setConfirmationCode(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Confirm
                    </Button>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}

export default ConfirmationForm;
