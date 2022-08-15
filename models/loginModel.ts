import { Schema, model, Document } from 'mongoose';

interface ILogin {
  email: string;
  password: string;
}

const signUpSchema = new Schema<ILogin>(
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

const Login = model<ILogin>('Login', signUpSchema);

export default Login;
