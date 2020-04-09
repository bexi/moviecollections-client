import {Auth} from "aws-amplify";
import Button from "@material-ui/core/Button";
import React from "react";

const VerifyEmailButton = ({ history, user, setErrorCode }) => {

    const resendVerificationCode = () => {
        Auth.resendSignUp(user.email).then(() => {
            const state = { 'email': user.email, 'password': user.password };
            history.push('/signup/verify', state);
            setErrorCode(null);
        }).catch(e => {
            alert(e);
        });
    }

    return (
        <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={() => resendVerificationCode()}
        >
            Resend verification code to email
        </Button>
    );
}

export default VerifyEmailButton;