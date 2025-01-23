import jwt from "jsonwebtoken";
import Config from "../config/config";


class Token {
    static async generateToken(payload: object): Promise<string> {
        try {
          return jwt.sign(payload, Config.JWTHeader.secret, { expiresIn: Config.JWTHeader.expires })  
        } catch (error) {
          throw new Error('Error generating token');
        }
      }
      static async verifyToken(token:string): Promise<object | string>  {
        try {
          return jwt.verify(token, Config.JWTHeader.secret)   
        } catch (error) {
          throw new Error('Invalid or expired token');
        }
      }
}

export default Token;