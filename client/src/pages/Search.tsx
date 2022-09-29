import axios from "axios";
import { useEffect } from "react";
import PetList from "../components/PetList";
import SearchForm from "../components/SearchForm";
import { useStore } from "../store";
import { Pet } from "../types/types";
import { BASE_URL } from "../utils/globals";

type Props = {};

const Search = (props: Props) => {
  const { pets, setPets } = useStore();

  const fetchPets = async () => {
    const { data }: { data: Pet } = await axios.get(`${BASE_URL}/pet`);
    if (data) setPets(data);
  };

  useEffect(() => {
    fetchPets();
  }, []);
  return (
    <>
      <h1>Find A Pet</h1>
      <SearchForm />
      <PetList petsList={pets} />
    </>
  );
};

export default Search;
