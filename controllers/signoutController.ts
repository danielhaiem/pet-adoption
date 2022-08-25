import { Request, Response } from 'express';

const signout = (req: Request, res: Response) => {
  try {
    res.cookie('token', '', { maxAge: 1 });
    res.redirect('/');
  } catch (error) {
    console.log(error);
  }
};

export { signout };
