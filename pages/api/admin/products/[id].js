import nc from "next-connect";
import Product from "../../../../models/product";
import db from "../../../../utils/db";
import { isAdmin, isAuth } from "../../../../utils/auth";

const handler = nc();

handler.use(isAuth, isAdmin)

handler.get(async (req,res) =>{
    await db.connect();
    const product = await Product.findById(req.query.id);
    await db.disconnect();
    res.send(product);
})


export default handler;