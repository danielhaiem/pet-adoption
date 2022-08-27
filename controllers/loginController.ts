import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import type { IUser } from '../types/types';

dotenv.config();

const login = (req: Request, res: Response) => {
  try {
    const { _id, isAdmin }: IUser = req.body.user;
    const token = jwt.sign(
      { id: _id, isAdmin: isAdmin },
      process.env.TOKEN_SECRET as string,
      {
        expiresIn: '1d',
      }
    );
    res.cookie('token', token, { maxAge: 24 * 60 * 60 * 1000 });

    res.send({
      ok: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export { login };
