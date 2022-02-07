import nc from 'next-connect';
import User from '../../../models/user';
import db from '../../../utils/db';
import Jwt from 'jsonwebtoken';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const email = req.body.email;
  res.send("hi");
});

handler.post(async (req, res) => {
  await db.connect();
  const user = await User.findOne({ email: req.body.email });
  const email = req.body.email;
  if (email === user.email) {
    const secret = process.env.JWT_SECRET + user.password;
    const payload = {
      _id: user._id,
      email: user.email,
    };
    const token = Jwt.sign(payload, secret, { expiresIn: '15m' });
    // const link = `http://localhost:3000/api/users/reset-password/${user._id}&${token}`;
    const link = `http://localhost:3000/api/users/reset-password/?id=${user._id}&token=${token}`;
    console.log(link);
  }

  await db.disconnect();
});

export default handler;
