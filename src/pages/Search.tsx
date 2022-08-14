import React from 'react';
import SearchResults from '../components/SearchResults';

type Props = {};

const Search = (props: Props) => {
  return (
    <>
      <h1>Find A Pet</h1>
      <SearchResults />
    </>
  );
};

export default Search;
