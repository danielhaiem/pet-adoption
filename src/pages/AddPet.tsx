import axios from "axios";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useState,
} from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { PetType } from "../types/types";

type Props = {};

const AddPet = (props: Props) => {
  const params = useParams();

  const fetchPet = async () => {
    const { data }: { data: PetType } = await axios.get(`/pet/${params.id}`);
    if (data) {
      const dataAltered = {
        type: data?.type,
        name: data?.name,
        adoptionStatus: data?.adoptionStatus,
        height: data?.height,
        weight: data?.weight,
        color: data?.color,
        bio: data?.bio,
        hypoallergnic: data?.hypoallergnic === false ? "false" : "true",
        dietery: data?.dietery?.join(" "),
        breed: data?.breed,
      };
      setPetInfo(dataAltered);
    }
  };

  const initialPetInfo = {
    type: "",
    name: "",
    adoptionStatus: "",
    height: 0,
    weight: 0,
    color: "",
    bio: "",
    hypoallergnic: "",
    dietery: "",
    breed: "",
  };
  const [petInfo, setPetInfo] = useState(initialPetInfo);
  const [petImage, setPetImage] = useState("");

  useEffect(() => {
    fetchPet();
  }, [params]);

  const handlePetInfo: ChangeEventHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setPetInfo({ ...petInfo, [event.target.name]: event.target.value });
  };

  let petHypoallergnic = false;
  const dieteryArray = petInfo.dietery.split(" ");
  if (petInfo.hypoallergnic === "true") petHypoallergnic = true;
  if (petInfo.hypoallergnic === "false") petHypoallergnic = false;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const petData = new FormData();

      petData.append("type", petInfo.type);
      petData.append("name", petInfo.name);
      petData.append("adoptionStatus", petInfo.adoptionStatus);
      // !!!!!!!! FIND CORRECT TYPE !!!!!!!!!!!!!!!!!
      petData.append("height", petInfo.height.toString());
      petData.append("weight", petInfo.weight.toString());
      petData.append("color", petInfo.color);
      petData.append("bio", petInfo.bio);
      petData.append("hypoallergnic", petHypoallergnic.toString());
      // !!!!!!!! FIND CORRECT TYPE !!!!!!!!!!!!!!!!!
      petData.append("dietery", dieteryArray as any);
      petData.append("breed", petInfo.breed);
      petData.append("picture", petImage);

      if (params.id === ":id") {
        const res = await axios.post(`/pet`, petData, {
          withCredentials: true,
        });
      } else {
        const res = await axios.put(`/pet/${params.id}`, petData, {
          withCredentials: true,
        });
      }
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
      <h1>{params.id === ":id" ? "Add Pet" : "Edit Pet"}</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col lg={6} className="d-flex flex-column gap-3">
            <div>
              <Form.Label>Type:</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="type"
                onChange={handlePetInfo}
                value={petInfo.type}
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
                value={petInfo.adoptionStatus}
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
              <Form.Select
                aria-label="Default select example"
                name="hypoallergnic"
                onChange={handlePetInfo}
                value={petInfo.hypoallergnic}
              >
                <option>Filter hypoallergnic:</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </Form.Select>
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
              {params.id === ":id" ? "Submit" : "Update"}
            </Button>
          </div>
        </Row>
      </Form>
    </Container>
  );
};

export default AddPet;
