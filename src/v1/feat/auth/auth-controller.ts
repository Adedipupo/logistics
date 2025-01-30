import  { Request, Response, NextFunction } from 'express';
import AuthService from './auth-service';


class AuthController {
  private authService: AuthService;
  constructor() {
    this.authService = new AuthService();
  }

  authRegister = async(req: Request, res: Response, next: NextFunction): Promise<Response>=>{
    try {
      const {email, password,role,username} = req.body;
      const result = await this.authService.registerUserService(email, password,role,username);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  authLogin = async(req: Request, res: Response, next: NextFunction): Promise<Response>=>{
    try {
      const {email, password} = req.body;
      const result = await this.authService.loginUserService(email, password);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

}

export default AuthController;