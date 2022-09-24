import axios from "axios";
import { Dropdown } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { userAuthStore } from "../store";
import type { UserAuth } from "../types/types";

type Props = {};

const ProfileDropdown = (props: Props) => {
  let navigate = useNavigate();
  const userStore = userAuthStore();
  const { userInfo }: { userInfo: UserAuth } = userStore;
  const setCookieExists = userAuthStore((state) => state.setCookieExists);

  const handleSignOut = async () => {
    userStore.setUserInfo({});
    setCookieExists(false);
    const res = await axios.post("/signout", {
      withCredentials: true,
    });
    if (res) {
      navigate("/");
    }
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
            {userInfo?.fname} {userInfo?.lname}
          </div>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <LinkContainer to="/profile">
            <Dropdown.Item>Profile</Dropdown.Item>
          </LinkContainer>
          <LinkContainer to="/mypets">
            <Dropdown.Item>My Pets</Dropdown.Item>
          </LinkContainer>
          <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default ProfileDropdown;
