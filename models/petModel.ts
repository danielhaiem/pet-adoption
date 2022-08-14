import { Schema, model } from 'mongoose';

interface IPet {
  type: string;
  name: string;
  adoptionStatus: string;
  picture: string;
  height: number;
  weight: number;
  color: string;
  bio: string;
  hypoallergnic: boolean;
  dietery: [];
  breed: string;
}

interface PetForDB extends IPet {
  user: any;
}

const petSchema = new Schema<PetForDB>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
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
      any: Array,
      required: true,
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

const Pet = model<PetForDB>('Pet', petSchema);

export default Pet;
