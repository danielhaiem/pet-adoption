import { Schema, model, models, Document } from 'mongoose';

interface IUser {
  email: string;
  password: string;
  fname: string;
  lname: string;
  tel: string;
  bio: string;
  savedPets: Array<Object>;
  isAdmin?: boolean;
}

interface IUserDocument extends IUser, Document {
  matchPassword: (password: string) => Promise<Boolean>;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    tel: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    savedPets: {
      type: Array<Object>(),
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = models['Users'] || model<IUserDocument>('Users', userSchema);

export { User };
