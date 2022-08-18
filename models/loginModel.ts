import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

interface ILogin {
  email: string;
  password: string;
}
interface ILoginDocument extends ILogin, Document {
  matchPassword: (password: string) => Promise<Boolean>;
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

loginSchema.methods.matchPassword = async function (
  this: ILoginDocument,
  enteredPassword: string
) {
  return await bcrypt.compare(enteredPassword, this.password);
};

loginSchema.pre('save', async function (this: ILoginDocument, next) {
  if (!this.isModified('password')) next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Login = model<ILoginDocument>('Login', loginSchema);

export default Login;
