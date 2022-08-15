import { Schema, model } from 'mongoose';

interface IEditPet {
  type: string;
  name: string;
  adoptionStatus: string;
  picture: string;
  height: number;
  weight: number;
  color: string;
  bio: string;
  hypoallergnic: boolean;
  dietery: Array<Object>;
  breed: string;
}

const editPetSchema = new Schema<IEditPet>(
  {
    type: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    adoptionStatus: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    hypoallergnic: {
      type: Boolean,
      required: true,
    },
    dietery: {
      type: Array<Object>(),
    },
    breed: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const EditPet = model<IEditPet>('EditPet', editPetSchema);

export default EditPet;
