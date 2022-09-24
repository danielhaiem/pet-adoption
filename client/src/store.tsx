import create from "zustand";
import type { UserAuth, Pet } from "./types/types";

type Store = {
  pets: Pet;
  setPets: (pets: Pet) => void;
};

type TokenStore = {
  userInfo: UserAuth;
  setUserInfo: (userInfo: UserAuth) => void;
  cookieExists: boolean;
  setCookieExists: (input: boolean) => void;
};

type ModalStore = {
  show: boolean;
  setShow: (input: boolean) => void;
};

type AlertStore = {
  alertShow: boolean;
  setAlertShow: (input: boolean) => void;
  errorMessage: string;
  setErrorMessage: (input: string) => void;
  successMessage: string;
  setSuccessMessage: (input: string) => void;
  alertBool: boolean;
  setAlertBool: (input: boolean) => void;
};

const useStore = create<Store>((set) => ({
  pets: [],
  setPets: (pets: Pet) => set((state) => ({ ...state, pets })),
}));

const userAuthStore = create<TokenStore>((set) => ({
  userInfo: {},
  setUserInfo: (userInfo: UserAuth) => set((state) => ({ ...state, userInfo })),
  cookieExists: false,
  setCookieExists: (input: boolean) =>
    set((state) => ({ cookieExists: input })),
}));

const modalSignUpInStore = create<ModalStore>((set) => ({
  show: false,
  setShow: (input: boolean) => set((state) => ({ show: input })),
}));

const alertsStore = create<AlertStore>((set) => ({
  alertShow: false,
  setAlertShow: (input: boolean) => set((state) => ({ alertShow: input })),
  errorMessage: "",
  setErrorMessage: (input: string) => set((state) => ({ errorMessage: input })),
  successMessage: "",
  setSuccessMessage: (input: string) =>
    set((state) => ({ successMessage: input })),
  alertBool: false,
  setAlertBool: (input: boolean) => set((state) => ({ alertBool: input })),
}));

export { useStore, userAuthStore, modalSignUpInStore, alertsStore };
