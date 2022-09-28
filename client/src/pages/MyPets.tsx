import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Tabs, Tab } from "react-bootstrap";
import PetList from "../components/PetList";
import { userAuthStore } from "../store";
import { MyPets, Pet } from "../types/types";
import { BASE_URL } from "../utils/globals";

type Props = {};

const MyPetsPage = (props: Props) => {
  const cookieExists = userAuthStore((state) => state.cookieExists);

  const [myPetList, setMyPetList] = useState<Pet>([]);
  const [favoriteList, setFavoriteList] = useState<Pet>([]);

  const fetchUserPets = async () => {
    if (cookieExists) {
      const { data }: { data: MyPets } = await axios.get(
        `${BASE_URL}/pet/user/id`,
        {
          withCredentials: true,
        }
      );
      if (data) {
        setMyPetList([...data.adoptedPets, ...data.fosteredPets]);
        setFavoriteList([...data.savedPets]);
      }
    }
  };

  useEffect(() => {
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
            {myPetList.length > 0 ? (
              <PetList petsList={myPetList} />
            ) : (
              "You currently do not own or foster any pets"
            )}
          </Tab>
          <Tab eventKey="savedpets" title="Favorite Pets">
            {favoriteList.length > 0 ? (
              <PetList petsList={favoriteList} />
            ) : (
              "You currently do not have any favorited pets"
            )}
          </Tab>
        </Tabs>{" "}
      </Container>
    </>
  );
};

export default MyPetsPage;
