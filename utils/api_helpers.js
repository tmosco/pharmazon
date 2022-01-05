import db from '../utils/db';
import Product from '../models/product'
// import

export async function getProduct() {
  await db.connect();
  const products = await Product.find({}).lean();
  await db.disconnect();
  return products;
}
