import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/userModel";

const passwordsMatch = (req: Request, res: Response, next: NextFunction) => {
  if (req.body.password !== req.body.repassword) {
    res.status(400).send("Passwords do not match");
    return;
  }
  next();
};

const isNewUser = async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    res.status(400).send("User already exists");
    return;
  }
  next();
};

const hashPwd = (req: Request, res: Response, next: NextFunction) => {
  const saltRounds = 10;
  if (req.body.password) {
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
      if (err) {
        res.status(500).send(err.message);
        return;
      }
      req.body.password = hash;
    });
  }
  next();
};

export { passwordsMatch, isNewUser, hashPwd };
