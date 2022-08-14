import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import PetCard from '../components/PetCard';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

type Props = {};

type Pet = {
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

const SearchResults = (props: Props) => {
  const [pets, setPets] = useState<Pet>([]);

  useEffect(() => {
    const fetchPets = async () => {
      const { data }: { data: Pet } = await axios.get('/api/pets');
      setPets(data);
    };
    fetchPets();
  }, []);

  return (
    <Row>
      {pets.map((pet) => (
        <Col key={uuidv4()} sm={12} md={6} lg={4} xl={3}>
          <PetCard pet={pet} />
        </Col>
      ))}
    </Row>
  );
};

export default SearchResults;
