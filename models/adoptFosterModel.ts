import { Schema, model } from 'mongoose';

interface IAdoptFoster {
  adoptionStatus: string;
}

const adoptFosterSchema = new Schema<IAdoptFoster>(
  {
    adoptionStatus: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const AdoptFoster = model<IAdoptFoster>('AdoptFoster', adoptFosterSchema);

export default AdoptFoster;
