import { Row, Col } from 'react-bootstrap';
import PetCard from './PetCard';
import { Pet } from '../types/types';

type Props = {
  petsList: Pet;
};

const PetList = (props: Props) => {
  return (
    <Row>
      {props.petsList.map((pet) => (
        <Col key={pet._id} sm={12} md={6} lg={4} xl={4}>
          <PetCard pet={pet} />
        </Col>
      ))}
    </Row>
  );
};

export default PetList;
