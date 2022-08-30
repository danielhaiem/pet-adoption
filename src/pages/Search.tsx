import PetList from '../components/PetList';
import SearchForm from '../components/SearchForm';
import { useStore } from '../store';

type Props = {};

const Search = (props: Props) => {
  console.log('Search Page Rerender');
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
