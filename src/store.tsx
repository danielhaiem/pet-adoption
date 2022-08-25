import create from 'zustand';
import { useEffect } from 'react';

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

type Store = {
  pets: Pet;
  setPets: (pets: Pet) => void;
};

type UserAuth = {
  id: string;
  email: string;
  fname: string;
  lname: string;
  tel: string;
  isAdmin?: boolean;
  bio?: string;
  ok: boolean;
}[];

type TokenStore = {
  token: UserAuth;
  setToken: (token: UserAuth) => void;
  cookieExists: boolean;
  setCookieExists: (input: boolean) => void;
};

const useStore = create<Store>((set) => ({
  pets: [],
  setPets: (pets: Pet) => set((state) => ({ ...state, pets })),
}));

const userAuthStore = create<TokenStore>((set) => ({
  token: [],
  setToken: (token: UserAuth) => set((state) => ({ ...state, token })),
  cookieExists: false,
  setCookieExists: (input: boolean) =>
    set((state) => ({ cookieExists: input })),
}));

export { useStore, userAuthStore };
