import axios from 'axios';
import { Dropdown } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { userAuthStore } from '../store';
import type { UserAuth } from '../types/types';

type Props = {};

const ProfileDropdown = (props: Props) => {
  let navigate = useNavigate();
  const userStore = userAuthStore();
  const { token }: { token: UserAuth } = userStore;
  const setCookieExists = userAuthStore((state) => state.setCookieExists);

  const handleSignOut = async () => {
    const res = await axios.post('/signout', {
      withCredentials: true,
    });
    setCookieExists(false);
    userStore.setToken({});
    navigate('/');
  };

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle
          id="dropdown-basic"
          className="d-flex align-items-center gap-2"
        >
          <FaUser size={20} />
          <div>
            {token?.fname} {token?.lname}
          </div>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <LinkContainer to="/profile">
            <Dropdown.Item>Profile</Dropdown.Item>
          </LinkContainer>
          <Dropdown.Item href="#/action-2">My Pets</Dropdown.Item>
          <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default ProfileDropdown;
