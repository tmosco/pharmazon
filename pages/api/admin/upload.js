import nextConnect from 'next-connect';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import { onError } from '../../../utils/error';
import { isAdmin, isAuth } from '../../../utils/auth';

cloudinary.config({
  cloud_url: process.env.CLOUDINARY_URL,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = nextConnect({ onError });
const upload = multer();

handler.use( isAuth, isAdmin,upload.single('file')).post(async (req, res) => {
  const streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream((error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      });
      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
  };
  const result = await streamUpload(req);
  res.send(result);
});


export default handler;
