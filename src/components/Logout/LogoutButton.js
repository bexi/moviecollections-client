import React from "react";
import { Auth } from "aws-amplify";
import Button from '@material-ui/core/Button';

function LogoutButton({auth}) {
  const onClick = async() => {
    await Auth.signOut();
    auth.userHasAuthenticated(false)
  }

  return (
    <Button color="inherit" onClick={onClick}>Logout</Button>
  );
}

export default LogoutButton;
