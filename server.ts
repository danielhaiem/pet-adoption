import express, { Request, Response, Application, NextFunction } from 'express';
import { resolve } from 'path';
import dotenv from 'dotenv';
import connectDB from './config/db';
import pets from './data/PetsDataSet';

// Below doesn't work!!!
// const express = require('express');
dotenv.config();
connectDB();
const app: Application = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req: Request, res: Response): void => {
  res.send('API is running...');
});

app.get('/api/pets', (req: Request, res: Response): void => {
  res.json(pets);
});

app.get('/api/pets/:id', (req: Request, res: Response): void => {
  const pet = pets.find((pet) => pet.name === req.params.id);
  res.json(pet);
});

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
