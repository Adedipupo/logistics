import  { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../../../config/db';
import jwt from 'jsonwebtoken';
import Config from '../../../config/config';
import { User } from './auth.entity';

export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const { email, username, password } = req.body;

  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({ where: { email } });

  if (user) {
    return res.status(401).json({ message: 'Email already exist' });
  }

  const newUser = new User();

  newUser.username = username;
  newUser.email = email;
  newUser.password = password;
  newUser.isActive = true;
  newUser.role = 'user';

     // Save the user to the database
     await userRepository.save(newUser);

    // Generate a JWT token
    const payload = { userId: newUser.id, username: newUser.username, email: newUser.email };
    const secret = Config.JWTHeader.secret;

  if (!secret) {
    return res.status(500).json({ message: 'JWT secret is not configured' });
  }

  const token = jwt.sign(payload, secret, { expiresIn: '1h' });

  return res.status(201).json({ message: 'User registered successfully', token });  } catch (error) {
    console.error('Error in registerUser:', error);
    next(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  const { email, password } = req.body;

  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({ where: { email } });

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
