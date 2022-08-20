import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

type Props = {
  pet: {
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
  };
};

const PetCard = ({ pet }: Props) => {
  return (
    <Card className="my-3 p-3">
      <Link to={`/pet/${pet._id}`}>
        <Card.Img
          src={
            pet.type === 'Dog'
              ? 'https://placedog.net/250/250'
              : 'http://placekitten.com/250/250'
          }
          variant="top"
        />
      </Link>
      <Card.Body>
        <Link to={`/pet/${pet._id}`} className="text-decoration-none text-dark">
          <Card.Title as="h3">
            <strong>{pet.name}</strong>
          </Card.Title>
        </Link>
        <div className="d-flex justify-content-between">
          <Card.Text as="div">{pet.adoptionStatus}</Card.Text>
          <Link
            to={`/pet/${pet._id}`}
            className="text-decoration-none text-primary"
          >
            <Card.Text as="div">
              <strong>SEE MORE</strong>
            </Card.Text>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PetCard;
