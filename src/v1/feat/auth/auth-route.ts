import express,{ Request, Response, NextFunction } from 'express';
import { registerUser } from './auth-controller';

const router = express.Router();

router.post('/register', (req: Request, res: Response, next: NextFunction) => {
    registerUser(req, res, next);
  });
export default router;