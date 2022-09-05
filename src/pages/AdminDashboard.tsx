import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Tab, Table, Tabs } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import type { Pet, UsersType } from "../types/types";

type Props = {};

const AdminDashboard = (props: Props) => {
  const navigate = useNavigate();
  const userTitleArray = [
    "id",
    "email",
    "fname",
    "lname",
    "tel",
    "isAdmin",
    "biography",
    "pets",
  ];
  const petTitleArray = [
    "id",
    "type",
    "name",
    "adoptionStatus",
    "height",
    "weight",
    "color",
    "breed",
    "link",
  ];
  const [users, setUsers] = useState<UsersType>([]);
  const [pets, setPets] = useState<Pet>([]);

  const fetchUsers = async () => {
    const { data } = await axios.get("/user", { withCredentials: true });
    if (data) setUsers(data);
  };

  const fetchPets = async () => {
    const { data }: { data: Pet } = await axios.get("/pet");
    if (data) setPets(data);
  };

  useEffect(() => {
    fetchUsers();
    fetchPets();
  }, []);
  return (
    <>
      <h1 className="mb-4">Admin Dashboard</h1>
      <Container fluid>
        <Tabs
          defaultActiveKey="users"
          id="justify-tab-example"
          className="mb-3  d-flex flex-row"
          justify
        >
          <Tab eventKey="users" title="Users">
            <Table responsive striped bordered hover className="mb-4">
              <thead>
                <tr>
                  <th>#</th>
                  {Array.from({ length: 8 }).map((_, index) => (
                    <th key={index}>{userTitleArray[index]}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user?._id}</td>
                    <td>{user?.email}</td>
                    <td>{user?.fname}</td>
                    <td>{user?.lname}</td>
                    <td>{user?.tel}</td>
                    <td>{user?.isAdmin === true ? "yes" : "no"}</td>
                    <td>{user?.bio ? user?.bio : "n/a"}</td>
                    <td>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => navigate(`/user/${user?._id}/full`)}
                      >
                        Click
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>
          <Tab eventKey="pets" title="Pets">
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  {Array.from({ length: 9 }).map((_, index) => (
                    <th key={index}>{petTitleArray[index]}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pets.map((pet, index) => (
                  <tr key={pet._id}>
                    <td>{index + 1}</td>
                    <td>{pet?._id}</td>
                    <td>{pet?.type}</td>
                    <td>{pet?.name}</td>
                    <td>{pet?.adoptionStatus}</td>
                    <td>{pet?.height}</td>
                    <td>{pet?.weight}</td>
                    <td>{pet?.color}</td>
                    <td>{pet?.breed}</td>

                    <td>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => navigate(`/pet/${pet._id}`)}
                      >
                        Click
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>
        </Tabs>{" "}
      </Container>
    </>
  );
};

export default AdminDashboard;
