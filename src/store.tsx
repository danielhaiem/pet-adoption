import create from 'zustand';

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

const useStore = create<Store>((set) => ({
  pets: [],
  setPets: (pets: Pet) => set((state) => ({ ...state, pets })),
}));

export default useStore;
