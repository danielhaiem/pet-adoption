type UserAuth = {
  id?: string;
  email?: string;
  fname?: string;
  lname?: string;
  tel?: string;
  isAdmin?: boolean;
  bio?: string;
  savedPets?: (string | undefined)[];
  fosteredPets?: (string | undefined)[];
  adoptedPets?: (string | undefined)[];
  ok?: boolean;
};

type ISignUp = {
  email: string;
  password: string;
  fname: string;
  lname: string;
  tel: string;
  bio: string;
};

type Pet = {
  _id: string;
  type: string;
  name: string;
  adoptionStatus: string;
  picture: string;
  height: number;
  weight: number;
  color: string;
  bio: string;
  hypoallergnic: boolean;
  dietery: [];
  breed: string;
}[];

type MyPets = {
  savedPets: Pet;
  fosteredPets: Pet;
  adoptedPets: Pet;
};

type PetType = {
  _id: string;
  type: string;
  name: string;
  adoptionStatus: string;
  picture: string;
  height: number;
  weight: number;
  color: string;
  bio: string;
  hypoallergnic: boolean;
  dietery: never[];
  breed: string;
};

type UsersType = {
  _id?: string;
  email?: string;
  fname?: string;
  lname?: string;
  tel?: string;
  isAdmin?: boolean;
  bio?: string;
  savedPets?: Pet;
  fosteredPets?: Pet;
  adoptedPets?: Pet;
}[];

type UserType = {
  user: {
    _id: string;
    email: string;
    fname: string;
    lname: string;
    tel: string;
    isAdmin: boolean;
    bio?: string;
    savedPets: Pet;
    fosteredPets: Pet;
    adoptedPets: Pet;
    ok?: boolean;
  };
  savedPets: Pet;
  fosteredPets: Pet;
  adoptedPets: Pet;
};

type UserType2 = {
  _id: string;
  email: string;
  fname: string;
  lname: string;
  tel: string;
  isAdmin: boolean;
  bio?: string;
  savedPets: Pet;
  fosteredPets: Pet;
  adoptedPets: Pet;
  ok?: boolean;
};

export type {
  UserAuth,
  Pet,
  ISignUp,
  PetType,
  MyPets,
  UsersType,
  UserType,
  UserType2,
};
