import { Request, Response } from 'express';
import Users from '../models/signUpModel';

const authUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as { email: string; password: string };
    const user = await Users.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        email: user.email,
        fname: user.fname,
        lname: user.lname,
        tel: user.tel,
        bio: user.bio,
        admin: user.isAdmin,
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    console.error(error);
  }
};

export default authUser;
