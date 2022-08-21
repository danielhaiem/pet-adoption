import { JSONSchemaType } from 'ajv';

interface ISignup {
  email: string;
  password: string;
  repassword: string;
  fname: string;
  lname: string;
  tel: string;
  isAdmin?: boolean;
}

const signUpSchema: JSONSchemaType<ISignup> = {
  type: 'object',
  properties: {
    email: { type: 'string', maxLength: 50 },
    password: { type: 'string', minLength: 6 },
    repassword: { type: 'string', minLength: 6 },
    fname: { type: 'string', minLength: 2, maxLength: 15 },
    lname: { type: 'string', minLength: 2, maxLength: 20 },
    tel: { type: 'string' },
    isAdmin: { type: 'boolean', nullable: true },
  },
  additionalProperties: false,
  required: ['email', 'password', 'repassword', 'fname', 'lname', 'tel'],
};

export { signUpSchema };
