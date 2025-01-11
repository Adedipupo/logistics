import { Request, Response, NextFunction } from 'express';
import { users } from '../../../utils/data';
import jwt from 'jsonwebtoken';
import Config from '../../../config/config';

 const login = (req: Request, res: Response, next: NextFunction): Response => {
    const { username, password } = req.body;

    const user = users.find((user) => user.username === username && user.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const payload = { id: user.id, role: user.role };
    const secret = Config.JWTHeader.secret;

    if (!secret) {
        return res.status(500).json({ message: 'JWT secret is not configured' });
    }

    const token = jwt.sign(payload, secret, { expiresIn: "1h" });

    return res.json({ token });
};

export default login;