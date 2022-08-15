import bcrypt from 'bcrypt';

interface ISignUp {
  email: string;
  password: string;
  repassword: string;
  fname: string;
  lname: string;
  tel: string;
  isAdmin?: boolean;
}

const users: ISignUp[] = [
  {
    email: 'admin@test.com',
    password: bcrypt.hashSync('123456', 10),
    repassword: bcrypt.hashSync('123456', 10),
    fname: 'Admin',
    lname: 'User',
    tel: '05356781234',
    isAdmin: true,
  },
  {
    email: 'john@test.com',
    password: bcrypt.hashSync('123456', 10),
    repassword: bcrypt.hashSync('123456', 10),
    fname: 'John',
    lname: 'Doe',
    tel: '05312345678',
  },
  {
    email: 'jane@test.com',
    password: bcrypt.hashSync('123456', 10),
    repassword: bcrypt.hashSync('123456', 10),
    fname: 'Jane',
    lname: 'Doe',
    tel: '05387654321',
  },
];

export default users;
