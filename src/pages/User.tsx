import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';
import { BiArrowBack } from 'react-icons/bi';
import { Link, useParams } from 'react-router-dom';
import PetList from '../components/PetList';
import { Pet, UserType, UserType2 } from '../types/types';

type Props = {};

const User = (props: Props) => {
  const params = useParams();
  const [currentUser, setCurrentUser] = useState<UserType2>();
  const [userPetList, setUserPetList] = useState<Pet>([]);
  const [favoriteList, setFavoriteList] = useState<Pet>([]);

  const fetchUser = async () => {
    const { data }: { data: UserType } = await axios.get(
      `/user/${params.id}/full`,
      { withCredentials: true }
    );
    if (data) {
      setCurrentUser(data.user);
      setUserPetList([...data.adoptedPets, ...data.fosteredPets]);
      setFavoriteList([...data.savedPets]);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [params]);

  return (
    <>
      <Link to={-1 as any}>
        <BiArrowBack className="text-dark my-3" size={35} />
      </Link>
      <Container fluid>
        <h1>
          Current User: {currentUser?.fname} {currentUser?.lname}
        </h1>
        <Tabs
          defaultActiveKey="userpets"
          id="justify-tab-example"
          className="mb-3  d-flex flex-row"
          justify
        >
          <Tab eventKey="userpets" title="My Pets">
            {userPetList.length > 0 ? (
              <PetList petsList={userPetList} />
            ) : (
              'User currently does not own or foster any pets'
            )}
          </Tab>
          <Tab eventKey="savedpets" title="Favorite Pets">
            {favoriteList.length > 0 ? (
              <PetList petsList={favoriteList} />
            ) : (
              'user currently does not have any favorited pets'
            )}
          </Tab>
        </Tabs>{' '}
      </Container>
    </>
  );
};

export default User;
