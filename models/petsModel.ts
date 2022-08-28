import { Schema, model, models } from 'mongoose';
import type { IPet } from '../types/types';

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

const Pets = models['Pets'] || model<IPet>('Pets', petSchema);

export default Pets;
