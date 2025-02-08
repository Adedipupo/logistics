import {Router,Request,Response,NextFunction} from 'express';
import authRoute from '../feat/auth/auth-route';

const router = Router();


router.use("/auth", authRoute);



export default router;
