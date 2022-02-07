import {
  Button,
  List,
  ListItem,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import Layout from '../components/Layout';
import useStyles from '../utils/styles';



function ForgotPassword() {
  const [email, setEmail] = useState();

 async function submitHandler() {

console.log(email)
}

  const classes = useStyles();
  return (
    <Layout title="Forget Password">
      <form onSubmit={submitHandler} className={classes.form}>
        <Typography component="h1" variant="h1">
          Password assistance
        </Typography>
        <Typography>
          Enter your user account verified email address and we will send you
          a password reset link.
        </Typography>
        <List>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="email"
              label="Email"
              inputProps={{ type: 'email' }}
              onChange={(e) => setEmail(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Send Password Reset Email
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}

export default ForgotPassword;
