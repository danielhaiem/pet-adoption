import create from 'zustand';
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

type ModalStore = {
  show: boolean;
  setShow: (input: boolean) => void;
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

const modalSignUpInStore = create<ModalStore>((set) => ({
  show: false,
  setShow: (input: boolean) => set((state) => ({ show: input })),
}));

export { useStore, userAuthStore, modalSignUpInStore };
