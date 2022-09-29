import { Request, Response } from "express";

const signout = (req: Request, res: Response) => {
  try {
    if (req.cookies.token) {
      res.clearCookie("token", {
        maxAge: 168 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production" ? true : false,
      });
      res.send({ ok: true });
    } else {
      throw new Error("No cookie to clear");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export { signout };
