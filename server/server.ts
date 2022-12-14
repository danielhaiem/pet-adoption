import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import cors from "cors";
import petsRoute from "./routes/petsRoute";
import signupRoute from "./routes/signupRoute";
import loginRoute from "./routes/loginRoute";
import signoutRoute from "./routes/signoutRoute";
import userRoute from "./routes/userRoute";
import { notFound, errorHandler } from "./middleware/errorMiddleware";
import cookieParser from "cookie-parser";

const app: Application = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://petadoption-app-peqh.onrender.com",
      "https://petadoption-app.netlify.app",
      "https://app.danielhaiem.com",
    ],
    credentials: true,
  })
);
dotenv.config();
connectDB();
const PORT = process.env.PORT || 5000;
app.use("/images", express.static("images"));

app.get("/", (req: Request, res: Response): void => {
  res.send("API is running...");
});

app.use("/pet", petsRoute);
app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/signout", signoutRoute);
app.use("/user", userRoute);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
