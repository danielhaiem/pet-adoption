import { Schema, model, Types } from 'mongoose';

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
  dietery: Array<Object>;
  breed: string;
}

const petSchema = new Schema<IPet>(
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
      // required: true,
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

const Pets = model<IPet>('Pets', petSchema);

export default Pets;
