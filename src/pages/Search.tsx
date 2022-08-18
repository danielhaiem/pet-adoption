import React, { useState } from 'react';
import SearchResults from '../components/SearchResults';
import SearchForm from '../components/SearchForm';

type Props = {};

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

const Search = (props: Props) => {
  const [pets, setPets] = useState<Pet>([]);

  return (
    <>
      <h1>Find A Pet</h1>
      <SearchForm setPets={setPets} />
      <SearchResults pets={pets} />
    </>
  );
};

export default Search;
