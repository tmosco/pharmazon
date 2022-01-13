import nc from 'next-connect';
import Order from '../../../models/order';
import { isAuth } from '../../../utils/auth';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';

const handler = nc({
  onError,
});
handler.use(isAuth);

handler.get(async (req, res) => {
  await db.connect();

  const order = await Order.find({
    user: req.user._id,
  });

  res.send(order);
});

export default handler;
