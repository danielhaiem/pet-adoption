import { NextFunction, Request, Response } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import dotenv from 'dotenv';

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies;
  if (!token) {
    res.status(401).send('Token Required');
    return;
  }
  jwt.verify(
    token,
    process.env.TOKEN_SECRET as string,
    (err: any, decoded: any) => {
      if (err) {
        res.status(401).send('Invalid Token');
        return;
      }
      req.body.userId = decoded.id;
      next();
    }
  );
};

export { verifyToken };
