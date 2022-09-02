import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Tabs, Tab } from 'react-bootstrap';
import PetList from '../components/PetList';
import { userAuthStore } from '../store';
import { MyPets, Pet } from '../types/types';

type Props = {};

const MyPetsPage = (props: Props) => {
  console.log('mypets page rerender');
  const cookieExists = userAuthStore((state) => state.cookieExists);

  const [myPetList, setMyPetList] = useState<Pet>([]);
  const [favoriteList, setFavoriteList] = useState<Pet>([]);

  const fetchUserPets = async () => {
    if (cookieExists) {
      const { data }: { data: MyPets } = await axios.get(`/pet/user/:id`, {
        withCredentials: true,
      });
      if (data) {
        setMyPetList([...data.adoptedPets, ...data.fosteredPets]);
        setFavoriteList([...data.savedPets]);
      }
    }
  };

  useEffect(() => {
    console.log('mypets page fetchuser useeffect rerender');
    fetchUserPets();
  }, [cookieExists]);

  return (
    <>
      <Container fluid>
        <Tabs
          defaultActiveKey="mypets"
          id="justify-tab-example"
          className="mb-3  d-flex flex-row"
          justify
        >
          <Tab eventKey="mypets" title="My Pets">
            <PetList petsList={myPetList} />
          </Tab>
          <Tab eventKey="savedpets" title="Favorite Pets">
            <PetList petsList={favoriteList} />
          </Tab>
        </Tabs>{' '}
      </Container>
    </>
  );
};

export default MyPetsPage;
