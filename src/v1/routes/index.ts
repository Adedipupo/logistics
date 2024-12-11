import {Router,Request,Response,NextFunction} from 'express';
import authRouter from '../feat/auth/auth-route';

const router = Router();

/* GET home page. */
router.get('/', function(req:Request, res:Response, next:NextFunction) {
  res.send({ title: 'Express' });
});

router.use("/auth", authRouter);



export default router;
