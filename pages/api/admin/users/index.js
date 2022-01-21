import nc from "next-connect";
import User from "../../../../models/user";
import db from "../../../../utils/db";

const handler = nc();

handler.get(async (req,res) =>{
    await db.connect();
    const users = await User.find({});    
    await db.disconnect();
    res.send(users);
})


export default handler;