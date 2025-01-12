import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../../../config/db';
import jwt from 'jsonwebtoken';
import Config from '../../../config/config';
import { User } from './auth.entity';

export const login = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  const { username, password } = req.body;

  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({ where: { username } });

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const payload = { id: user.id, role: user.role };
  const secret = Config.JWTHeader.secret;

  if (!secret) {
    return res.status(500).json({ message: 'JWT secret is not configured' });
  }

  const token = jwt.sign(payload, secret, { expiresIn: '1h' });

  return res.json({ token });
};
