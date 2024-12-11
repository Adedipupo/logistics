import express,{Request,Response,NextFunction} from 'express';
import { users } from '../../../utils/data';
import jwt from 'jsonwebtoken';
import Config from '../../../config/config';



export const loginUser = (req:Request, res:Response, next: NextFunction): Response | void => {
    const { username, password } = req.body;

    const user = users.find((user) => user.username === username && user.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

  const payload = { id: user.id, role: user.role };
  console.log("Config.JWTHeader.secret",Config.JWTHeader.secret)
  const token = jwt.sign(payload, Config.JWTHeader.secret!, { expiresIn: "1h" });

  return res.json({ token });
}