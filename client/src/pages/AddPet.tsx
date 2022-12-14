import axios from "axios";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useState,
} from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { alertsStore } from "../store";
import { PetType } from "../types/types";
import { BASE_URL } from "../utils/globals";

type Props = {};

const AddPet = (props: Props) => {
  const params = useParams();
  const setAlertShow = alertsStore((state) => state.setAlertShow);
  const setAlertBool = alertsStore((state) => state.setAlertBool);
  const setErrorMessage = alertsStore((state) => state.setErrorMessage);
  const setSuccessMessage = alertsStore((state) => state.setSuccessMessage);

  const fetchPet = async () => {
    const { data }: { data: PetType } = await axios.get(
      `${BASE_URL}/pet/${params.id}`
    );
    if (data) {
      const originalPicture = data?.picture;
      setOriginalPetImage(originalPicture);
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
  const [petImage, setPetImage] = useState<File>();
  const [originalPetImage, setOriginalPetImage] = useState("");

  useEffect(() => {
    if (params.id !== ":id") fetchPet();
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
      petData.append("height", petInfo.height.toString());
      petData.append("weight", petInfo.weight.toString());
      petData.append("color", petInfo.color);
      petData.append("bio", petInfo.bio);
      petData.append("hypoallergnic", petHypoallergnic.toString());
      petData.append("dietery", dieteryArray.toString());
      petData.append("breed", petInfo.breed);
      if (petImage) {
        petData.append("picture", petImage);
      } else {
        if (params.id !== ":id") petData.append("picture", originalPetImage);
      }

      if (params.id === ":id") {
        const res = await axios.post(`${BASE_URL}/pet`, petData, {
          withCredentials: true,
        });
        setSuccessMessage("Pet successfully added!");
        setAlertBool(true);
        setAlertShow(true);
        setPetInfo(initialPetInfo);
      } else {
        const res = await axios.put(`${BASE_URL}/pet/${params.id}`, petData, {
          withCredentials: true,
        });
        setSuccessMessage("Pet successfully updated!");
        setAlertBool(true);
        setAlertShow(true);
      }
    } catch (error: any) {
      setErrorMessage(error.response.data);
      setAlertShow(true);
    }
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e && e.target && e.target.files) setPetImage(e.target.files[0]);
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
              <Form.Label className="formLabel">Height (in):</Form.Label>
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
