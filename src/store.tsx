import create from 'zustand';
import { useEffect } from 'react';
import type { UserAuth, Pet } from './types/types';

type Store = {
  pets: Pet;
  setPets: (pets: Pet) => void;
};

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
  token: {},
  setToken: (token: UserAuth) => set((state) => ({ ...state, token })),
  cookieExists: false,
  setCookieExists: (input: boolean) =>
    set((state) => ({ cookieExists: input })),
}));

export { useStore, userAuthStore };
