import { Request, Response, NextFunction } from 'express';
import Pets from '../models/petsModel';

const isQueryValid = (req: Request, res: Response, next: NextFunction) => {
  // console.log(req.query);
  if (req.query.type === '') {
    res.status(400).send('Type query empty');
    return;
  }
  if (req.query.adoptionStatus === '') {
    res.status(400).send('Adoption status query empty');
    return;
  }

  if (req.query.height === '') {
    // typeof req.query.height !== 'number' && req.query.height
    res.status(400).send('Height query empty');
    return;
  }

  if (req.query.weight === '') {
    res.status(400).send('Weight query empty');
    return;
  }

  if (req.query.name === '') {
    res.status(400).send('Name query empty');
    return;
  }

  next();
};

const isPetAdopted = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pet = await Pets.findById(req.params.id);
  if (pet.adoptionStatus === 'Adopted') {
    res.status(400).send('Pet already adopted');
    return;
  }
  next();
};

const isPetAvailable = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pet = await Pets.findById(req.params.id);
  if (pet.adoptionStatus === 'Available') {
    res.status(400).send('Pet is available and can not be returned');
    return;
  }
  next();
};

export { isQueryValid, isPetAdopted, isPetAvailable };
