import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useContext, useReducer } from 'react';
import { getError } from '../../utils/error';
import { Store } from '../../utils/Store';
import useStyles from '../../utils/styles';
import NextLink from 'next/link';
import {
  Grid,
  TableContainer,
  Typography,
  CircularProgress,
  Button,
  Card,
  List,
  ListItem,
  Table,
  TableRow,
  TableCell,
  TableBody,
  ListItemText,
  TableHead,
} from '@material-ui/core';
import Layout from '../../components/Layout';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, Products: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'CREATE_REQUEST':
      return { ...state, loadingCreate: true, error: '' };
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreate: false };
    case 'CREATE_FAIL':
      return { ...state, loadingCreate: false };

    default:
      state;
  }
}

function AdminProduct() {
  const classes = useStyles();
  const router = useRouter();
  const { state } = useContext(Store);
  const { userInfo } = state;

  const [{ loading, error, Products, loadingCreate }, dispatch] = useReducer(
    reducer,
    {
      loading: true,
      Products: [],
      error: '',
    }
  );

  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
    }
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/products`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, []);

  function createHandler() {}
  return (
    <Layout title="Product History">
      <Grid container spacing={1}>
        <Grid item md={3} xs={12}>
          <Card className={classes.section}>
            <List>
              <NextLink href="/admin/dashboard" passHref>
                <ListItem button component="a">
                  <ListItemText primary="Admin Dashboard"></ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/admin/orders" passHref>
                <ListItem button component="a">
                  <ListItemText primary="Orders"></ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/admin/products" passHref>
                <ListItem selected button component="a">
                  <ListItemText primary="Products"></ListItemText>
                </ListItem>
              </NextLink>
            </List>
          </Card>
        </Grid>
        <Grid item md={9} xs={12}>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item md={9} xs={12}>
                    <Typography component="h1" variant="h1">
                      Products
                    </Typography>
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={createHandler}
                    >
                      Create
                    </Button>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                {loading ? (
                  <CircularProgress />
                ) : error ? (
                  <Typography className={classes.error}>{error}</Typography>
                ) : (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>ID</TableCell>
                          <TableCell>NAME</TableCell>
                          <TableCell>PRICE</TableCell>
                          <TableCell>CATEGORY</TableCell>
                          <TableCell>COUNT</TableCell>
                          <TableCell>RATING</TableCell>
                          <TableCell>ACTIONS</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Products.map((product) => (
                          <TableRow key={product._id}>
                            <TableCell>
                              {product._id.substring(20, 24)}
                            </TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>₦{product.price}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>{product.countInStock}</TableCell>
                            <TableCell>{product.rating}</TableCell>

                            <TableCell>
                              <NextLink
                                href={`/admin/product/${product._id}`}
                                passHref
                              >
                                <Button size="small" variant="contained">
                                  Edit{' '}
                                </Button>
                              </NextLink>
                              {'  '}
                              <NextLink
                                href={`/product/${product._id}`}
                                passHref
                              >
                                <Button size="small" variant="contained">
                                  Delete{' '}
                                </Button>
                              </NextLink>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(AdminProduct), { ssr: false });
