import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button } from "react-bootstrap";
import { BiArrowBack } from "react-icons/bi";
import { MdFavoriteBorder } from "react-icons/md";
import axios from "axios";
import type { Pet, PetType, UserAuth } from "../types/types";
import {
  alertsStore,
  modalSignUpInStore,
  userAuthStore,
  useStore,
} from "../store";
import { AiOutlineEdit } from "react-icons/ai";

type Props = {};

const initPetState: PetType = {
  _id: "",
  type: "",
  name: "",
  adoptionStatus: "",
  picture: "",
  height: 0,
  weight: 0,
  color: "",
  bio: "",
  hypoallergnic: false,
  dietery: [],
  breed: "",
};

const PetPage = (props: Props) => {
  const navigate = useNavigate();
  const userStore = userAuthStore();
  const cookieExists = userAuthStore((state) => state.cookieExists);
  const store = useStore();
  const setErrorMessage = alertsStore((state) => state.setErrorMessage);
  const setAlertShow = alertsStore((state) => state.setAlertShow);
  const setAlertBool = alertsStore((state) => state.setAlertBool);

  const setShow = modalSignUpInStore((state) => state.setShow);
  const handleShow = () => setShow(true);

  const params = useParams();
  const [pet, setPet] = useState<PetType>(initPetState);
  const [fetchUserBool, setFetchUserBool] = useState(false);
  const [fetchPetBool, setFetchPetBool] = useState(false);

  const fetchPet = async () => {
    const { data }: { data: PetType } = await axios.get(`/pet/${params.id}`);
    setPet(data);
    if (data) {
      const { data }: { data: Pet } = await axios.get("/pet");
      store.setPets(data);
    }
  };

  const fetchUser = async () => {
    if (cookieExists) {
      const { data }: { data: UserAuth } = await axios.get(`/user/id`, {
        withCredentials: true,
      });
      userStore.setUserInfo(data);
    }
  };

  useEffect(() => {
    fetchPet();
  }, [params, fetchPetBool]);

  useEffect(() => {
    fetchUser();
  }, [fetchUserBool]);

  const handleSavePet = async () => {
    try {
      if (cookieExists) {
        if (userStore.userInfo.savedPets?.includes(params.id)) {
          const res = await axios.delete(`/pet/${params.id}/save`, {
            withCredentials: true,
          });
          if (res.data) setFetchUserBool((prev) => !prev);
        } else {
          const res = await axios.post(`/pet/${params.id}/save`, {
            withCredentials: true,
          });
          if (res.data) {
            setFetchPetBool((prev) => !prev);
            setFetchUserBool((prev) => !prev);
          }
        }
      }
    } catch (error: any) {
      setErrorMessage(error.response.data);
      setAlertShow(true);
      setFetchPetBool((prev) => !prev);
      setFetchUserBool((prev) => !prev);
    }
  };

  const handleFosterPet = async () => {
    try {
      if (cookieExists) {
        if (!userStore.userInfo.fosteredPets?.includes(params.id)) {
          const res = await axios.post(
            `/pet/${params.id}/adopt`,
            { adoptionStatus: "Fostered" },
            {
              withCredentials: true,
            }
          );
          if (res.data) {
            setFetchPetBool((prev) => !prev);
            setFetchUserBool((prev) => !prev);
          }
        }
      }
    } catch (error: any) {
      setErrorMessage(error.response.data);
      setAlertShow(true);
      setFetchPetBool((prev) => !prev);
      setFetchUserBool((prev) => !prev);
    }
  };

  const handleAdoptPet = async () => {
    try {
      if (cookieExists) {
        if (!userStore.userInfo.adoptedPets?.includes(params.id)) {
          const res = await axios.post(
            `/pet/${params.id}/adopt`,
            { adoptionStatus: "Adopted" },
            {
              withCredentials: true,
            }
          );
          if (res.data) {
            setFetchPetBool((prev) => !prev);
            setFetchUserBool((prev) => !prev);
          }
        }
      }
    } catch (error: any) {
      setErrorMessage(error.response.data);
      setAlertShow(true);
      setFetchPetBool((prev) => !prev);
      setFetchUserBool((prev) => !prev);
    }
  };

  const returnPet = async () => {
    try {
      if (cookieExists) {
        if (
          userStore.userInfo.adoptedPets?.includes(params.id) ||
          userStore.userInfo.fosteredPets?.includes(params.id)
        ) {
          const res = await axios.post(`/pet/${params.id}/return`, {
            withCredentials: true,
          });
          if (res.data) {
            setFetchPetBool((prev) => !prev);
            setFetchUserBool((prev) => !prev);
          }
        } else {
          console.log("return pet didn't work");
        }
      }
    } catch (error: any) {
      setErrorMessage(error.response.data);
      setAlertShow(true);
      setFetchPetBool((prev) => !prev);
      setFetchUserBool((prev) => !prev);
    }
  };

  return (
    <>
      <Link to={-1 as any}>
        <BiArrowBack className="text-dark my-3" size={35} />
      </Link>
      <Row>
        <Col lg={6} className="d-flex justify-content-center">
          <Image src={pet.picture} alt={pet?.name} className="rounded " fluid />
        </Col>
        <Col lg={6}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h1>{pet?.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex gap-4">
              <span>Type: {pet?.type ? pet?.type : "N/A"}</span>
              <span>Breed: {pet?.breed ? pet?.breed : "N/A"}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Adoption Status:{" "}
              {pet?.adoptionStatus ? pet?.adoptionStatus : "N/A"}
            </ListGroup.Item>
            <ListGroup.Item className="d-flex gap-4">
              <span>Height: {pet?.height ? pet?.height : "N/A"}in</span>
              <span>Weight: {pet?.weight ? pet?.weight : "N/A"}lbs</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Color: {pet?.color ? pet?.color : "N/A"}
            </ListGroup.Item>
            <ListGroup.Item>
              Bio:{"   "}
              {pet?.bio
                ? pet?.bio
                : `   Our lil munchkin ${pet?.name} is the sweetest! ${pet?.name} wants all the head scratches, bell rubs, and snuggles you have to offer! Adopt this absolute lovebug today!`}
            </ListGroup.Item>
            <ListGroup.Item>
              Hypoallergenic: {pet?.hypoallergnic ? "Yes" : "No"}
            </ListGroup.Item>
            <ListGroup.Item>
              Dietary Restrictions:{" "}
              {!pet?.dietery
                ? "N/A"
                : pet?.dietery.length > 0
                ? pet?.dietery.join(", ")
                : "N/A"}
            </ListGroup.Item>
          </ListGroup>
          <div className="d-flex gap-1 p-2">
            {pet?.adoptionStatus !== "Adopted" && (
              <Button
                variant="primary"
                size="lg"
                className="flex-fill"
                onClick={cookieExists ? handleAdoptPet : handleShow}
              >
                Adopt
              </Button>
            )}
            {pet?.adoptionStatus === "Available" && (
              <Button
                variant="primary"
                size="lg"
                className="flex-fill"
                onClick={cookieExists ? handleFosterPet : handleShow}
              >
                Foster
              </Button>
            )}
            {(userStore.userInfo.adoptedPets?.includes(params.id) ||
              userStore.userInfo.fosteredPets?.includes(params.id)) && (
              <Button
                variant="primary"
                size="lg"
                className="flex-fill"
                onClick={cookieExists ? returnPet : handleShow}
              >
                Return
              </Button>
            )}
          </div>
          <div className="d-flex p-2">
            <Button
              variant="secondary"
              size="lg"
              className="flex-fill"
              onClick={cookieExists ? handleSavePet : handleShow}
            >
              <MdFavoriteBorder className="me-3" stroke="white" size={27} />
              {userStore.userInfo.savedPets?.includes(params.id)
                ? "UNFAVORITE"
                : "FAVORITE"}
            </Button>
          </div>
          {userStore.userInfo.isAdmin === true && (
            <div className="d-flex p-2">
              <Button
                variant="info"
                size="lg"
                className="flex-fill"
                onClick={() => navigate(`/addpet/${params.id}`)}
              >
                <AiOutlineEdit className="me-3" stroke="white" size={27} />
                Edit
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </>
  );
};

export default PetPage;
