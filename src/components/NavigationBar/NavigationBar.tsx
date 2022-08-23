import React from 'react';
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { AiOutlineHome, AiOutlineSetting } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { LinkContainer } from 'react-router-bootstrap';
import FormModal from '../FormModal';
import './NavigationBar.css';

type Props = {};

const NavigationBar = (props: Props) => {
  return (
    <Navbar
      collapseOnSelect
      bg="primary"
      variant="dark"
      expand={false}
      className="mb-3 navbar"
    >
      <Container fluid>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${false}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
          placement="start"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title
              id={`offcanvasNavbarLabel-expand-${false}`}
              className="display-5"
            >
              wm adoption
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className=" justify-content-end flex-grow-1 pe-3">
              <LinkContainer to="/">
                <Nav.Link className="link-hover d-flex gap-4">
                  <AiOutlineHome className="align-self-center fs-3" />
                  <span className="fs-4">Home</span>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/search">
                <Nav.Link className="link-hover d-flex gap-4">
                  <BsSearch className="align-self-center fs-4" />
                  <span className="fs-4">Search</span>
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/profile">
                <Nav.Link className="link-hover d-flex gap-4">
                  <AiOutlineSetting className="align-self-center fs-4" />
                  <span className="fs-4">Profile</span>
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
        <Nav.Link className="me-4 ">
          <FormModal />
        </Nav.Link>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
