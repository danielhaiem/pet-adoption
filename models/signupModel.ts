import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

interface ISignup {
  email: string;
  password: string;
  fname: string;
  lname: string;
  tel: string;
  isAdmin?: boolean;
}

const signupSchema = new Schema<ISignup>(
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

const Signup = model<ISignup>('Users', signupSchema);

export { Signup };
