import { Request, Response } from 'express';
import Pets from '../models/petsModel';
import { User } from '../models/userModel';
import { ISignup } from '../types/types';

const getSearchResults = async (req: Request, res: Response): Promise<void> => {
  // either use middleware in be to see if query is filled or empty. If empty then change object in middleware. OR in fe change object to filter to categories that aren't empty

  // const { name, type, height } = req.query;
  // const pets = await Pets.find({ name: {$regex: `/${name}/`}, height: {$lte: height}, we });
  try {
    const pets = await Pets.find(req.query);
    res.json(pets);
  } catch (error) {
    console.error(error);
  }
};

const getPetById = async (req: Request, res: Response): Promise<void> => {
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
};

const addSavedPet = async (req: Request, res: Response): Promise<void> => {
  try {
    const pet = await Pets.findById(req.params.id);
    if (pet) {
      const { userId }: ISignup = req.body;
      const { id } = req.params;
      const currentUser = await User.findById(userId);
      if (!currentUser.savedPets) {
        const userSavePet = await User.findOneAndUpdate(
          { _id: userId },
          { $push: { savedPets: id } }
        ).exec();
        res.send({
          ok: true,
        });
      } else if (!currentUser.savedPets.includes(id)) {
        const userSavePet = await User.findOneAndUpdate(
          { _id: userId },
          { $push: { savedPets: id } }
        ).exec();
        res.send({
          ok: true,
        });
      } else {
        res.status(404).json({ message: 'Pet already saved' });
        throw new Error('Pet already saved');
      }
    } else {
      res.status(404).json({ message: 'Pet not found' });
      throw new Error('Pet not found');
    }
  } catch (error) {
    console.error(error);
  }
};

const deleteSavedPet = async (req: Request, res: Response): Promise<void> => {
  try {
    const pet = await Pets.findById(req.params.id);
    if (pet) {
      const { userId }: ISignup = req.body;
      const { id } = req.params;
      const currentUser = await User.findById(userId);
      if (currentUser.savedPets.includes(id)) {
        const userSavePet = await User.findOneAndUpdate(
          { _id: userId },
          { $pull: { savedPets: id } }
        ).exec();
        res.send({
          ok: true,
        });
      } else {
        res.status(404).json({ message: 'Pet not found' });
        throw new Error('Pet not found');
      }
    } else {
      res.status(404).json({ message: 'Pet not found' });
      throw new Error('Pet not found');
    }
  } catch (error) {
    console.error(error);
  }
};

export { getSearchResults, getPetById, addSavedPet, deleteSavedPet };
