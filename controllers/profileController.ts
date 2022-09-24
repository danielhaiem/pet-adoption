import dotenv from 'dotenv';
import { User } from '../models/userModel';
import { Request, Response } from 'express';
import connectDB from '../config/db';
import type { ISignup } from '../types/types';

dotenv.config();
connectDB();

const updateUserInfo = async (req: Request, res: Response) => {
  try {
    const { userId, email, password, fname, lname, tel, bio }: ISignup =
      req.body;
    const currentUser = await User.findById(userId);
    if (email) currentUser.email = email;
    if (password) currentUser.password = password;
    if (fname) currentUser.fname = fname;
    if (lname) currentUser.lname = lname;
    if (tel) currentUser.tel = tel;
    if (bio) currentUser.bio = bio;
    await currentUser.save();
    res.send({
      ok: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export { updateUserInfo };
