import { Schema, model, Document } from 'mongoose';

interface ISignUp {
  email: string;
  password: string;
  fname: string;
  lname: string;
  tel: string;
  bio: string;
  isAdmin?: boolean;
}

const signUpSchema = new Schema<ISignUp>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 2,
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

const Users = model<ISignUp>('Users', signUpSchema);

export default Users;
