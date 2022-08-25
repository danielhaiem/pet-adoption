import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response } from 'express';

dotenv.config();

interface IUser {
  _id: string;
  email: string;
  fname: string;
  lname: string;
  tel: string;
  isAdmin?: boolean;
  bio?: string;
  ok: boolean;
}

const login = (req: Request, res: Response) => {
  try {
    const { _id, email, fname, lname, tel, isAdmin, bio }: IUser =
      req.body.user;
    const token = jwt.sign(
      { id: _id, isAdmin: isAdmin },
      process.env.TOKEN_SECRET as string,
      {
        expiresIn: '1d',
      }
    );
    res.cookie('token', token, { maxAge: 24 * 60 * 60 * 1000 });

    res.send({
      id: _id,
      email: email,
      fname: fname,
      lname: lname,
      tel: tel,
      isAdmin: isAdmin,
      bio: bio || '',
      ok: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export { login };
