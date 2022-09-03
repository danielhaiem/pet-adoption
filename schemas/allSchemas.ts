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

const petSchema = {
  type: 'object',
  properties: {
    type: { type: 'string' },
    name: { type: 'string' },
    adoptionStatus: { type: 'string' },
    height: { type: 'number' },
    weight: { type: 'number' },
    color: { type: 'string' },
    bio: { type: 'string' },
    hypoallergnic: { type: 'boolean' },
    dietery: { type: 'array' },
    breed: { type: 'string' },
    picture: { type: 'string' },
  },
  required: ['type'],
  additionalProperties: false,
};

export { signUpSchema, loginSchema, profileSchema, petSchema };
