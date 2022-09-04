import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import type { UsersType } from '../types/types';
import { v4 as uuidv4 } from 'uuid';

type Props = {};

const AdminDashboard = (props: Props) => {
  const navigate = useNavigate();
  const titleArray = [
    'id',
    'email',
    'fname',
    'lname',
    'tel',
    'isAdmin',
    'biography',
    'pets',
  ];
  const [users, setUsers] = useState<UsersType>([]);

  const fetchUsers = async () => {
    const { data } = await axios.get('/user', { withCredentials: true });
    if (data) setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <>
      <h1>Admin Dashboard:</h1>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            {Array.from({ length: 8 }).map((_, index) => (
              <th key={index}>{titleArray[index]}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={uuidv4()}>
              <td key={uuidv4()}>{index + 1}</td>
              <td key={uuidv4()}>{user?._id}</td>
              <td key={uuidv4()}>{user?.email}</td>
              <td key={uuidv4()}>{user?.fname}</td>
              <td key={uuidv4()}>{user?.lname}</td>
              <td key={uuidv4()}>{user?.tel}</td>
              <td key={uuidv4()}>{user?.isAdmin === true ? 'yes' : 'no'}</td>
              <td key={uuidv4()}>{user?.bio ? user?.bio : 'n/a'}</td>
              <td key={uuidv4()}>
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
    </>
  );
};

export default AdminDashboard;
