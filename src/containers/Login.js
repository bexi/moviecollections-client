import React, { useState } from "react";
import { Auth } from "aws-amplify";

//import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
//import "./Login.css";
import { FormControl, FormGroup, Button, FormLabel, Input } from '@material-ui/core';

export default function Login( props ) {
  console.log('props', props);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await Auth.signIn(email, password);
      alert("Logged in");
      props.userHasAuthenticated(true);
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel>Email</FormLabel>
          <Input
            id="email"
            aria-describedby="email"
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Password</FormLabel>
          <Input
            id="password"
            aria-describedby="password"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        </FormGroup>
        <Button type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}
