import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PetList from "../components/PetList";
import SearchForm from "../components/SearchForm";
import { useStore } from "../store";
import { Pet } from "../types/types";
import { BASE_URL } from "../utils/globals";

type Props = {};

const Search = (props: Props) => {
  const { pets, setPets } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();

  const queryLength = searchParams.toString();

  const fetchPets = async () => {
    const { data }: { data: Pet } = await axios.get(`${BASE_URL}/pet`);
    if (data) setPets(data);
  };

  useEffect(() => {
    if (queryLength.length === 0) {
      fetchPets();
    }
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
