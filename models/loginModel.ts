import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

interface ILogin {
  email: string;
  password: string;
}

const loginSchema = new Schema<ILogin>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Login = model<ILogin>('users', loginSchema);

export default Login;
