import PetList from '../components/PetList';
import SearchForm from '../components/SearchForm';
import { useStore } from '../store';

type Props = {};

const Search = (props: Props) => {
  const petSearchResultStore = useStore();
  const { pets } = petSearchResultStore;
  return (
    <>
      <h1>Find A Pet</h1>
      <SearchForm />
      <PetList petsList={pets} />
    </>
  );
};

export default Search;
