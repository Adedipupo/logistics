import { Request,Response,NextFunction } from "express"
import Token from "../utils/tokenUtils";

export const verifyUser = async(req:Request,res:Response,next:NextFunction) => {
    try {        
        let token;
    
        const authHeader = req.headers.authorization;
    
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
          }
    
        token = authHeader.split(" ")[1];
    
        const decoded = await Token.verifyToken(token);
    
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }

}

export const isUser = async (req:Request,res:Response,next:NextFunction) => {
    if (req.user && req.user.role === 'user') {
      next()
    } else {
        return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }
  }