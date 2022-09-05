import { Router } from "express";
import {
  getSearchResults,
  getPetById,
  addSavedPet,
  deleteSavedPet,
  adoptOrFosterPet,
  returnPet,
  getUserPets,
  addPet,
  editPet,
} from "../controllers/petController";
import { upload, uploadToCloudinary } from "../middleware/imagesMiddleware";
import {
  isPetAdopted,
  isPetAvailable,
  isQueryValid,
} from "../middleware/petsMiddleware";
import { isAdmin, verifyToken } from "../middleware/userMiddleware";

const router = Router();

router.get("/", isQueryValid, getSearchResults);

router.post(
  "/",
  verifyToken,
  isAdmin,
  upload.single("picture"),
  uploadToCloudinary,
  addPet
);

router.get("/:id", getPetById);
router.put(
  "/:id",
  verifyToken,
  isAdmin,
  upload.single("picture"),
  uploadToCloudinary,
  editPet
);

router.post("/:id/save", verifyToken, addSavedPet);
router.delete("/:id/save", verifyToken, deleteSavedPet);

router.post("/:id/adopt", verifyToken, isPetAdopted, adoptOrFosterPet);
router.post("/:id/return", verifyToken, isPetAvailable, returnPet);

router.get("/user/:id", verifyToken, getUserPets);

export default router;
