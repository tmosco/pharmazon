import {
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  RadioGroup,
  Typography,
  Radio,
  Button,
} from '@material-ui/core';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useEffect, useState, useContext } from 'react';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import useStyles from '../utils/styles';
import { useSnackbar } from 'notistack';

export default function Payment() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const classes = useStyles();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { shippingAddress },
  } = state;
  const [paymentMethod, setPaymentMethod] = useState('');
  const router = useRouter();
  useEffect(() => {
    if (!shippingAddress.address) {
      router.push('/shipping');
    } else {
      setPaymentMethod(Cookies.get('paymentMethod') || '');
    }
  }, []);
  function submitHandler(e) {
    closeSnackbar();
    e.preventDefault();
    if (!paymentMethod) {
      enqueueSnackbar('Payment method is required ', { variant: 'error' });
    }else{
        dispatch({type:'SAVE_PAYMENT_METHOD', payload:paymentMethod});
        Cookies.set('paymentMethod', JSON.stringify(paymentMethod));
        router.push('/placeorder');

    }
  }
  return (
    <Layout title="Payment method">
      <CheckoutWizard activeStep={2}></CheckoutWizard>
      <form className={classes.form} onSubmit={submitHandler}>
        <Typography component="h1" variant="h1">
          Payment Method
        </Typography>
        <List>
          <ListItem>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="Payment Method"
                name="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  label="Paypal"
                  value="payPal"
                  control={<Radio />}
                ></FormControlLabel>
                <FormControlLabel
                  label="Stripe"
                  value="Stripe"
                  control={<Radio />}
                ></FormControlLabel>
                <FormControlLabel
                  label="Cash"
                  value="Cash"
                  control={<Radio />}
                ></FormControlLabel>
              </RadioGroup>
            </FormControl>
          </ListItem>
          <ListItem>
            <Button fullWidth type="submit" variant="contained" color="Primary">
              Continue
            </Button>
          </ListItem>
          <ListItem>
            <Button
              fullWidth
              type="button"
              variant="contained"
              onClick={() => router.push('/shipping')}
            >
              Back
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
