import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response } from 'express';

dotenv.config();

const login = (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    const token = jwt.sign(
      { id: user._id },
      process.env.TOKEN_SECRET as string,
      {
        expiresIn: '1d',
      }
    );
    res.cookie('token', token, { maxAge: 24 * 60 * 60 * 1000 });
    res.send({ fname: user.fname, ok: true });
  } catch (error) {
    console.log(error);
  }
};

export { login };
