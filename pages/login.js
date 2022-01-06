import React , {useState} from 'react';
import Layout from '../components/Layout';
import NextLink from 'next/link';
import {
  Button,
  Link,
  List,
  ListItem,
  TextField,
  Typography,
} from '@material-ui/core';
import useStyles from '../utils/styles';
import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()



  const classes = useStyles();
  async function submitHandler(e) {
    e.preventDefault();
    try {
        const { data } = await axios.post('/api/users/login', { email, password });
        alert("success login")
    } catch (err) {
        alert(err.response.data ? err.response.data.message : err.message);
        
    }
  }
  return (
    <Layout title="Login">
      <form onSubmit={submitHandler} className={classes.form}>
        <Typography component="h1" variant="h1">
          Login
        </Typography>
        <List>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="email"
              label="Email"
              inputProps={{ type: 'email' }}
              onChange={e => setEmail(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="password"
              label="Password"
              inputProps={{ type: 'password' }}
              onChange={e => setPassword(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Login
            </Button>
          </ListItem>
          <ListItem>
            Don't have an account? &nbsp;
            <NextLink href={'/register'} passHref>
              <Link> Register</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
