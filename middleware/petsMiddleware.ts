import { Request, Response, NextFunction } from "express";
import Pets from "../models/petsModel";
import { User } from "../models/userModel";

const isQueryValid = (req: Request, res: Response, next: NextFunction) => {
  const searchObj = {};
  if (req.query.type) {
    Object.assign(searchObj, { type: req.query.type });
  }
  if (req.query.adoptionStatus) {
    Object.assign(searchObj, { adoptionStatus: req.query.adoptionStatus });
  }

  if (req.query.height) {
    if (req.query.height === "small")
      Object.assign(searchObj, { height: { $gte: 0, $lte: 25 } });
    if (req.query.height === "medium")
      Object.assign(searchObj, { height: { $gte: 26, $lte: 60 } });
    if (req.query.height === "large")
      Object.assign(searchObj, { height: { $gte: 61 } });
  }

  if (req.query.weight) {
    if (req.query.weight === "small")
      Object.assign(searchObj, { weight: { $gte: 0, $lte: 25 } });
    if (req.query.weight === "medium")
      Object.assign(searchObj, { weight: { $gte: 26, $lte: 60 } });
    if (req.query.weight === "large")
      Object.assign(searchObj, { weight: { $gte: 61 } });
  }

  if (req.query.name) {
    Object.assign(searchObj, {
      name: { $regex: req.query.name, $options: "i" },
    });
  }
  req.query = searchObj;
  next();
};

const isPetAdopted = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pet = await Pets.findById(req.params.id);
  if (pet.adoptionStatus === "Adopted") {
    res.status(400).send("Pet already adopted");
    return;
  }
  if (
    pet.adoptionStatus === "Fostered" &&
    req.body.adoptionStatus === "Fostered"
  ) {
    res.status(400).send("Pet already fostered");
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
  if (pet.adoptionStatus === "Available") {
    res.status(400).send("Pet is available and can not be returned");
    return;
  }
  next();
};

const isUserOwner = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const isCurrentOwner = await User.findById(req.body.userId, {
    fosteredPets: 1,
    adoptedPets: 1,
    _id: 0,
  }).exec();
  const fosterCheck = isCurrentOwner.fosteredPets.find(
    (pet: string) => pet === id
  );
  const adoptedCheck = isCurrentOwner.adoptedPets.find(
    (pet: string) => pet === id
  );
  if (!fosterCheck && !adoptedCheck) {
    res
      .status(400)
      .send(
        "Pet is not fostered/adopted by you. Pet adoption status has been updated."
      );
    return;
  }
  next();
};

export { isQueryValid, isPetAdopted, isPetAvailable, isUserOwner };
