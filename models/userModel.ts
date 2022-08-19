import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

interface IUser {
  email: string;
  password: string;
  fname: string;
  lname: string;
  tel: string;
  bio: string;
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

userSchema.methods.matchPassword = async function (
  this: IUserDocument,
  enteredPassword: string
) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (this: IUserDocument, next) {
  if (!this.isModified('password')) next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Users = model<IUserDocument>('Users', userSchema);

export default Users;
