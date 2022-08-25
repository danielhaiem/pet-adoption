import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel';

const isExistingUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    req.body.user = user;

    next();
    return;
  }
  res.status(400).send('User with this email does not exist');
};

const verifyPwd = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = req.body;

  bcrypt.compare(req.body.password, user.password, (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    if (result) {
      next();
      return;
    } else {
      res.status(400).send('Incorrrect Password!');
    }
  });
};

export { isExistingUser, verifyPwd };
