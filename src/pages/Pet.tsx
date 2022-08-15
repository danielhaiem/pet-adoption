import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import { BiArrowBack } from 'react-icons/bi';
import { MdFavoriteBorder } from 'react-icons/md';
import axios from 'axios';

type Props = {};

type PetType = {
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
  dietery: never[];
  breed: string;
};

const initPetState: PetType = {
  _id: '',
  type: '',
  name: '',
  adoptionStatus: '',
  picture: '',
  height: 0,
  weight: 0,
  color: '',
  bio: '',
  hypoallergnic: false,
  dietery: [],
  breed: '',
};

const Pet = (props: Props) => {
  const params = useParams();
  const [pet, setPet] = useState<PetType>(initPetState);

  useEffect(() => {
    const fetchPet = async () => {
      const { data }: { data: PetType } = await axios.get(
        `/api/pet/${params.id}`
      );
      setPet(data);
    };
    fetchPet();
  }, [params]);
  return (
    <>
      <Link to="/search">
        <BiArrowBack className="text-dark my-3" size={35} />
      </Link>
      <Row>
        <Col md={6}>
          <Image
            src={
              pet?.type === 'Dog'
                ? 'https://placedog.net/640/510'
                : 'http://placekitten.com/640/510'
            }
            alt={pet?.name}
            fluid
          />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h1>{pet?.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              Type: {pet?.type ? pet?.type : 'N/A'}
            </ListGroup.Item>
            <ListGroup.Item>
              Adoption Status:{' '}
              {pet?.adoptionStatus ? pet?.adoptionStatus : 'N/A'}
            </ListGroup.Item>
            <ListGroup.Item className="d-flex gap-4">
              <span>Height: {pet?.height ? pet?.height : 'N/A'}cm</span>
              <span>Weight: {pet?.weight ? pet?.weight : 'N/A'}lbs</span>
            </ListGroup.Item>
            {/* <ListGroup.Item>
              Weight: {pet?.weight ? pet?.weight : 'N/A'}lbs
            </ListGroup.Item> */}
            <ListGroup.Item>
              Color: {pet?.color ? pet?.color : 'N/A'}
            </ListGroup.Item>
            <ListGroup.Item>
              Bio:{'   '}
              {pet?.bio
                ? pet?.bio
                : `   Our lil munchkin ${pet?.name} is the sweetest! ${pet?.name} wants all the head scratches, bell rubs, and snuggles you have to offer! Adopt this absolute lovebug today!`}
            </ListGroup.Item>
            <ListGroup.Item>
              Hypoallergenic: {pet?.hypoallergnic ? 'Yes' : 'No'}
            </ListGroup.Item>
            <ListGroup.Item>
              Dietary Restrictions:{' '}
              {!pet?.dietery
                ? 'N/A'
                : pet?.dietery.length > 1
                ? pet?.dietery.join(', ')
                : 'N/A'}
            </ListGroup.Item>
            <ListGroup.Item>
              Breed: {pet?.breed ? pet?.breed : 'N/A'}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Name:</Col>
                  <Col>
                    <strong>{pet?.name}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Adoption Status:</Col>
                  <Col>
                    <strong>{pet?.adoptionStatus}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
            <div className="d-grid gap-1 p-2">
              {/* TODO: Hide/Show buttons depending on user status */}
              <Button variant="warning" size="lg">
                Return {pet?.name}
              </Button>

              <Button variant="info" size="lg">
                Adopt {pet?.name}
              </Button>

              <Button variant="info" size="lg">
                Foster {pet?.name}
              </Button>

              <Button variant="secondary" size="lg">
                <MdFavoriteBorder className="me-3" stroke="white" size={27} />
                FAVORITE
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Pet;
