import { Request, Response } from "express";
import Pets from "../models/petsModel";
import { User } from "../models/userModel";

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find(
      {},
      {
        _id: 1,
        email: 1,
        fname: 1,
        lname: 1,
        tel: 1,
        isAdmin: 1,
        bio: 1,
        savedPets: 1,
        fosteredPets: 1,
        adoptedPets: 1,
      }
    );

    res.json(users);
  } catch (error) {
    console.error(error);
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.body.userId, {
      _id: 1,
      email: 1,
      fname: 1,
      lname: 1,
      tel: 1,
      isAdmin: 1,
      bio: 1,
      savedPets: 1,
      fosteredPets: 1,
      adoptedPets: 1,
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
      throw new Error("User not found");
    }
  } catch (error) {
    console.error(error);
  }
};

const getUserFull = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id, {
      email: 1,
      fname: 1,
      lname: 1,
      tel: 1,
      isAdmin: 1,
      bio: 1,
      savedPets: 1,
      fosteredPets: 1,
      adoptedPets: 1,
    });
    const myFosteredPets = await Pets.find(
      {
        _id: { $in: user?.fosteredPets },
      },
      { _id: 1, name: 1, adoptionStatus: 1, type: 1, picture: 1 }
    );
    const myAdoptedPets = await Pets.find(
      {
        _id: { $in: user?.adoptedPets },
      },
      { _id: 1, name: 1, adoptionStatus: 1, type: 1, picture: 1 }
    );
    const mySavedPets = await Pets.find(
      {
        _id: { $in: user?.savedPets },
      },
      { _id: 1, name: 1, adoptionStatus: 1, type: 1, picture: 1 }
    );
    res.json({
      user: user,
      fosteredPets: myFosteredPets,
      adoptedPets: myAdoptedPets,
      savedPets: mySavedPets,
    });
  } catch (error) {
    console.error(error);
  }
};

export { getUsers, getUser, getUserFull };
