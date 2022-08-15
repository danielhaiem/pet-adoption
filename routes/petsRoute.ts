import express, { Router, Request, Response } from 'express';
import Pets from '../models/addPetModel';

const router = Router();

// @desc    Fetch all pets
// @route   GET /api/pets
// @access  Public
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const pets = await Pets.find({});
    res.json(pets);
  } catch (error) {
    console.error(error);
  }
});

// @desc    Fetch single pet
// @route   GET /api/pets/:id
// @access  Public
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const pet = await Pets.findById(req.params.id);
    if (pet) {
      res.json(pet);
    } else {
      res.status(404).json({ message: 'Pet not found' });
      throw new Error('Pet not found');
    }
  } catch (error) {
    console.error(error);
  }
});

export default router;
