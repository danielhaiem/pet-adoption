import { Request, Response } from 'express';

const signout = (req: Request, res: Response) => {
  try {
    if (req.cookies.token) {
      res.clearCookie('token');
      res.send({ ok: true });
    } else {
      throw new Error('No cookie to clear');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export { signout };
