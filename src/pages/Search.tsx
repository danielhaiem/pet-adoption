import SearchResults from '../components/SearchResults';
import SearchForm from '../components/SearchForm';

type Props = {};

const Search = (props: Props) => {
  console.log('Search Page Rerender');
  return (
    <>
      <h1>Find A Pet</h1>
      <SearchForm />
      <SearchResults />
    </>
  );
};

export default Search;
