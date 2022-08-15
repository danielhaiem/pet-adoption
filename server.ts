import express, { Request, Response, Application, NextFunction } from 'express';
import { resolve } from 'path';
import dotenv from 'dotenv';
import connectDB from './config/db';
// import pets from './data/PetsDataSet';
import cors from 'cors';
import petsRoute from './routes/petsRoute';
import { notFound, errorHandler } from './middleware/errorMiddleware';

// Below doesn't work!!!
// const express = require('express');
dotenv.config();
connectDB();
const app: Application = express();
const PORT = process.env.PORT || 5000;
// BELOW CODE WILL MAKE IT SO SEARCH RESULTS DON'T SHOW
app.use(cors());

app.use(express.json());

// app.use('/pets', petsRoute)

app.get('/', (req: Request, res: Response): void => {
  res.send('API is running...');
});

app.use('/api/pet', petsRoute);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
