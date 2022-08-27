import dotenv from 'dotenv';
import { User } from '../models/userModel';
import { Request, Response } from 'express';
import connectDB from '../config/db';
import jwt from 'jsonwebtoken';
import type { ISignup } from '../types/types';

dotenv.config();
connectDB();

const signUpUser = async (req: Request, res: Response) => {
  try {
    const { email, password, fname, lname, tel }: ISignup = req.body;
    const newUser = { email, password, fname, lname, tel };
    const userId = await User.create(newUser);
    const token = jwt.sign(
      { id: userId._id, isAdmin: userId.isAdmin },
      process.env.TOKEN_SECRET as string,
      {
        expiresIn: '1d',
      }
    );
    res.cookie('token', token, { maxAge: 24 * 60 * 60 * 1000 });
    res.send({
      ok: userId.true,
    });
  } catch (error) {
    console.log(error);
  }
};

export { signUpUser };
