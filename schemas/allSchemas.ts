import { JSONSchemaType } from 'ajv';
import type { ILogin, IProfile, ISignupSchema } from '../types/types';

const signUpSchema: JSONSchemaType<ISignupSchema> = {
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

const loginSchema: JSONSchemaType<ILogin> = {
  type: 'object',
  properties: {
    email: { type: 'string', maxLength: 50 },
    password: { type: 'string', minLength: 6 },
    isAdmin: { type: 'boolean', nullable: true },
  },
  additionalProperties: false,
  required: ['email', 'password'],
};

const profileSchema: JSONSchemaType<IProfile> = {
  type: 'object',
  properties: {
    email: { type: 'string', maxLength: 50 },
    password: { type: 'string', minLength: 6 },
    repassword: { type: 'string', minLength: 6 },
    fname: { type: 'string', minLength: 2, maxLength: 15 },
    lname: { type: 'string', minLength: 2, maxLength: 20 },
    tel: { type: 'string' },
    bio: { type: 'string' },
    isAdmin: { type: 'boolean', nullable: true },
  },
  additionalProperties: false,
  required: [],
};

export { signUpSchema, loginSchema, profileSchema };
