import { Row, Col } from 'react-bootstrap';
import PetCard from '../components/PetCard';
import useStore from '../store';

type Props = {};

const SearchResults = (props: Props) => {
  const store = useStore();
  return (
    <Row>
      {store.pets.map((pet) => (
        <Col key={pet._id} sm={12} md={6} lg={4} xl={3}>
          <PetCard pet={pet} />
        </Col>
      ))}
    </Row>
  );
};

export default SearchResults;
