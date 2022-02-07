import {
  Button,
  List,
  ListItem,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useContext, useState } from 'react';
import Layout from '../components/Layout';
import useStyles from '../utils/styles';
import axios from 'axios';
import { Store } from '../utils/Store';

function ForgotPassword() {
  const [email, setEmail] = useState();
  const { state, dispatch } = useContext(Store);
 async function submitHandler(e) {
  // closeSnackbar();
  event.preventDefault();
  
  try {
    const { data } = await axios.post('/api/users/forgotpassword', {
      email,
  
    });
    dispatch({ type: 'USER_LOGIN', payload: data });
    // Cookies.set('userInfo', JSON.stringify(data));
    // router.push(redirect || '/');
  } catch (err) {
    // enqueueSnackbar(getError(err), {
    //   variant: 'error',
    // });
  }
}

  const classes = useStyles();
  return (
    <Layout title="Forget Password">
      <form onSubmit={submitHandler} className={classes.form}>
        <Typography component="h1" variant="h1">
          Password assistance
        </Typography>
        <Typography>
          Enter your user account's verified email address and we will send you
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
