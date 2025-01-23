import express,{ Request, Response, NextFunction } from 'express';
import AuthController from './auth-controller';

const router = express.Router();

const authController = new AuthController();

router.post('/register', (req: Request, res: Response, next: NextFunction) => {
    authController.authRegister(req,res,next);
})
router.post('/login', (req: Request, res: Response, next: NextFunction) => {
    authController.authLogin(req,res,next);
})


export default router;