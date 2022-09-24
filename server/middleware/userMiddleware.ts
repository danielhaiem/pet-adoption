import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel";

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies;
  if (!token) {
    res.status(401).send("Token Required");
    return;
  }
  jwt.verify(
    token,
    process.env.TOKEN_SECRET as string,
    (err: any, decoded: any) => {
      if (err) {
        res.status(401).send("Invalid Token");
        return;
      }
      req.body.userId = decoded.id;
      req.body.isAdmin = decoded.isAdmin;
      next();
    }
  );
};

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.findById(req.body.userId, { isAdmin: 1 });
  if (user.isAdmin === true && req.body.isAdmin === true) {
    req.body.user = user;
    next();
    return;
  }
  res.status(400).send("Only Admins can access this page.");
};

export { verifyToken, isAdmin };
