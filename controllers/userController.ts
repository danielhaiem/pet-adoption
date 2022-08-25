import { Request, Response } from 'express';
import { User } from '../models/userModel';

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

// TODO: destructure and return all elements except for the password
const getUsers = async (req: Request, res: Response) => {
  try {
    // const { token } = req.cookies;
    const user = await User.findById(req.body.userId);

    console.log(user);
    res.json(user);
  } catch (error) {
    console.error(error);
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    // const { token } = req.cookies;
    const user = await User.findById(req.body.userId);
    if (user) {
      const { _id, email, fname, lname, tel, isAdmin, bio }: IUser = user;
      res.json({
        id: _id,
        email: email,
        fname: fname,
        lname: lname,
        tel: tel,
        isAdmin: isAdmin,
        bio: bio || '',
        ok: true,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
      throw new Error('User not found');
    }
  } catch (error) {
    console.error(error);
  }
};

export { getUsers, getUser };
