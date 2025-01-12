import {Router,Request,Response,NextFunction} from 'express';
import authRoute from '../feat/auth/auth-route';

const router = Router();

// router.get('/', function(req:Request, res:Response, next:NextFunction) {
//   res.send({ title: 'ap is live' });
// });

router.use("/auth", authRoute);



export default router;
