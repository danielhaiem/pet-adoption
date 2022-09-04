import axios from 'axios';
import { ChangeEvent, ChangeEventHandler, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

type Props = {};

const AddPet = (props: Props) => {
  const [petInfo, setPetInfo] = useState({
    type: '',
    name: '',
    adoptionStatus: '',
    height: 0,
    weight: 0,
    color: '',
    bio: '',
    hypoallergnic: '',
    dietery: '',
    breed: '',
  });
  const [petImage, setPetImage] = useState('');

  const handlePetInfo: ChangeEventHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setPetInfo({ ...petInfo, [event.target.name]: event.target.value });
  };

  let petHypoallergnic = false;
  const dieteryArray = petInfo.dietery.split(' ');
  if (petInfo.hypoallergnic === 'true') petHypoallergnic = true;
  if (petInfo.hypoallergnic === 'false') petHypoallergnic = false;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const petData = new FormData();

      petData.append('type', petInfo.type);
      petData.append('name', petInfo.name);
      petData.append('adoptionStatus', petInfo.adoptionStatus);
      // !!!!!!!! FIND CORRECT TYPE !!!!!!!!!!!!!!!!!
      petData.append('height', Number(petInfo.height) as any);
      petData.append('weight', Number(petInfo.weight) as any);
      petData.append('color', petInfo.color);
      petData.append('bio', petInfo.bio);
      // !!!!!!!! FIND CORRECT TYPE !!!!!!!!!!!!!!!!!
      petData.append('hypoallergnic', petHypoallergnic as any);
      petData.append('dietery', dieteryArray as any);
      petData.append('breed', petInfo.breed);
      petData.append('picture', petImage);

      console.log('petData', Object.fromEntries(petData));

      const res = await axios.post(`/pet`, petData, { withCredentials: true });
    } catch (error) {
      console.log(error);
    }
  };

  // !!!!!!!! FIND CORRECT TYPE !!!!!!!!!!!!!!!!!
  const handleImage = (e: any) => {
    setPetImage(e.target.files[0]);
  };

  return (
    <Container fluid>
      <h1>Add Pet</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col lg={6} className="d-flex flex-column gap-3">
            <div>
              <Form.Label>Type:</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="type"
                onChange={handlePetInfo}
              >
                <option>Filter by type:</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
              </Form.Select>
            </div>
            <div>
              <Form.Label className="formLabel">Name:</Form.Label>
              <Form.Control
                onChange={handlePetInfo}
                placeholder="Enter pet name i.e. Rajah"
                name="name"
                value={petInfo.name}
              />
            </div>
            <div>
              <Form.Label>Adoption Status:</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="adoptionStatus"
                onChange={handlePetInfo}
              >
                <option>Filter by adoption status:</option>
                <option value="Available">Available</option>
                <option value="Adopted">Adopted</option>
                <option value="Fostered">Fostered</option>
              </Form.Select>
            </div>
            <div>
              <Form.Label className="formLabel">Height (cm):</Form.Label>
              <Form.Control
                onChange={handlePetInfo}
                placeholder="Enter number i.e. 5"
                name="height"
                type="number"
                value={petInfo.height}
              />
            </div>
            <div>
              <Form.Label className="formLabel">Weight (lbs):</Form.Label>
              <Form.Control
                onChange={handlePetInfo}
                placeholder="Enter number i.e. 25"
                name="weight"
                type="number"
                value={petInfo.weight}
              />
            </div>
            <div>
              <Form.Label className="formLabel">Color:</Form.Label>
              <Form.Control
                onChange={handlePetInfo}
                placeholder="Enter pet color i.e. White/Blue"
                name="color"
                value={petInfo.color}
              />
            </div>
          </Col>
          <Col lg={6} className="d-flex flex-column gap-3">
            <div>
              <Form.Label className="formLabel">Bio:</Form.Label>
              <Form.Control
                onChange={handlePetInfo}
                placeholder="Enter brief pet bio..."
                className="textArea"
                as="textarea"
                rows={3}
                name="bio"
                value={petInfo.bio}
              />
            </div>
            <div>
              <Form.Label className="formLabel">Hypoallergnic:</Form.Label>
              <Form.Group>
                <Form.Check
                  type="radio"
                  name="hypoallergnic"
                  label="Yes"
                  value="true"
                  onChange={handlePetInfo}
                />
                <Form.Check
                  type="radio"
                  name="hypoallergnic"
                  label="No"
                  value="false"
                  onChange={handlePetInfo}
                />
              </Form.Group>
            </div>
            <div>
              <Form.Label className="formLabel">Dietery:</Form.Label>
              <Form.Control
                onChange={handlePetInfo}
                placeholder="Enter pet dietery info."
                name="dietery"
                value={petInfo.dietery}
              />
              <Form.Text className="text-muted">
                **Instructions: Write individual words separated by a space
                without special characters.
              </Form.Text>
            </div>
            <div>
              <Form.Label className="formLabel">Breed:</Form.Label>
              <Form.Control
                onChange={handlePetInfo}
                placeholder="Enter pet breed."
                name="breed"
                value={petInfo.breed}
              />
            </div>
            <div>
              <Form.Group controlId="petImage">
                <Form.Label>Default file input example</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                />
              </Form.Group>
            </div>
          </Col>
        </Row>
        <Row className="mt-2">
          <div className="d-inline-flex flex-row-reverse">
            <Button variant="outline-success" type="submit">
              Submit
            </Button>
          </div>
        </Row>
      </Form>
    </Container>
  );
};

export default AddPet;
