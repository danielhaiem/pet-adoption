import dotenv from 'dotenv';
import { Signup } from '../models/signupModel';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import connectDB from '../config/db';

dotenv.config();
connectDB();

interface ISignup {
  email: string;
  password: string;
  fname: string;
  lname: string;
  tel: string;
  isAdmin?: boolean;
}

const signUpUser = async (req: Request, res: Response) => {
  try {
    const { email, password, fname, lname, tel }: ISignup = req.body;
    const newUser = { email, password, fname, lname, tel };
    const userId = await Signup.insertMany(newUser);
    res.send({ userId: userId, email });
  } catch (error) {
    console.log(error);
  }
};

export { signUpUser };
