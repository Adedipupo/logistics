import  { Request, Response, NextFunction } from 'express';
import AuthService from './auth-service';


class AuthController {
  private authService: AuthService;
  constructor() {
    this.authService = new AuthService();
  }

  authRegister = async(req: Request, res: Response, next: NextFunction): Promise<Response | void>=>{
    try {
      const {email, password,role,username} = req.body;
      console.log("authRegister", password, role, username);
      const result = await this.authService.registerUserService(email, password,role,username);
      return res.status(201).json(result);
    } catch (error) {
      console.error("Register Error:", error);
      next(error);
    }
  }

  authLogin = async(req: Request, res: Response, next: NextFunction): Promise<Response | void>=>{
    try {
      const {email, password} = req.body;
      const result = await this.authService.loginUserService(email, password);
      return res.status(201).json(result);
    } catch (error) {
      console.error("Login Error:", error);
      next(error);
    }
  }

}

export default AuthController;