interface IUser {
  _id: string;
  email: string;
  fname: string;
  lname: string;
  tel: string;
  isAdmin?: boolean;
  bio?: string;
  ok: boolean;
  savedPets?: Array<Object>;
}

interface ISignup {
  email: string;
  password: string;
  fname: string;
  lname: string;
  tel: string;
  bio: string;
  isAdmin?: boolean;
  userId: string;
}

interface ISignupSchema {
  email: string;
  password: string;
  repassword: string;
  fname: string;
  lname: string;
  tel: string;
  isAdmin?: boolean;
}

interface IPet {
  type: string;
  name: string;
  adoptionStatus: string;
  picture: string;
  height: number;
  weight: number;
  color: string;
  bio: string;
  hypoallergnic: boolean;
  dietery: Array<Object>;
  breed: string;
}

interface IProfile {
  email: string;
  password: string;
  repassword: string;
  fname: string;
  lname: string;
  tel: string;
  bio: string;
  isAdmin?: boolean;
}

interface ILogin {
  email: string;
  password: string;
  isAdmin?: boolean;
}

export type { IUser, ISignup, ISignupSchema, IPet, IProfile, ILogin };
