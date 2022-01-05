import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Layout from '../components/Layout';
import useStyles from '../utils/styles';
import NextLink from 'next/link';
import Product from '../models/product';

import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Link,
} from '@material-ui/core';
import data from '../utils/data';
import db from '../utils/db';

export default function Home({products}) {
  const classes = useStyles();
  return (
    <Layout>
      <div>
        <h1>Products </h1>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item md={4} key={product.name}>
              <Card>
                <NextLink href={`/product/${product.slug}`} passHref>
                  <Link>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        component="img"
                        image={product.image}
                        title={product.name}
                      ></CardMedia>
                    </CardActionArea>
                  </Link>
                </NextLink>
                <CardContent>
                  <Typography>{product.name}</Typography>
                </CardContent>
                <CardActions>
                  <Typography>₦{product.price}</Typography>
                  <Button size="small" color="primary">
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({}).lean();
  await db.disconnect();
  return {
    props: { products : products.map(db.convertDocToObj) },
  };
}
