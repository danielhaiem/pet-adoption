import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

interface ISignUp {
  email: string;
  password: string;
  fname: string;
  lname: string;
  tel: string;
  bio: string;
  isAdmin?: boolean;
}

interface ISignUpDocument extends ISignUp, Document {
  matchPassword: (password: string) => Promise<Boolean>;
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

signUpSchema.methods.matchPassword = async function (
  this: ISignUpDocument,
  enteredPassword: string
) {
  return await bcrypt.compare(enteredPassword, this.password);
};

signUpSchema.pre('save', async function (this: ISignUpDocument, next) {
  if (!this.isModified('password')) next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Users = model<ISignUpDocument>('Users', signUpSchema);

export default Users;
