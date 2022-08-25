import express, { Request, Response, Application, NextFunction } from 'express';
import { resolve } from 'path';
import dotenv from 'dotenv';
import connectDB from './config/db';
// import pets from './data/PetsDataSet';
import cors from 'cors';
import petsRoute from './routes/petsRoute';
import signupRoute from './routes/signupRoute';
import loginRoute from './routes/loginRoute';
import signoutRoute from './routes/signoutRoute';
import userRoute from './routes/userRoute';
import { notFound, errorHandler } from './middleware/errorMiddleware';
import cookieParser from 'cookie-parser';

dotenv.config();
connectDB();
const app: Application = express();
const PORT = process.env.PORT || 5000;
// BELOW CODE WILL MAKE IT SO SEARCH RESULTS DON'T SHOW
app.use(cors());
app.use(cookieParser());

app.use(express.json());

// app.use('/pets', petsRoute)

app.get('/', (req: Request, res: Response): void => {
  res.send('API is running...');
});

// Add middleware to authenticate if logged in user
app.use('/api/pet', petsRoute);
app.use('/signup', signupRoute);
app.use('/login', loginRoute);
app.use('/signout', signoutRoute);
app.use('/user', userRoute);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
