import React from 'react';
import { Modal, Form, Button, FloatingLabel } from 'react-bootstrap';

type Props = {
  handleClose: () => void;
};

const Signup = (props: Props) => {
  return (
    <>
      <Modal.Header>
        <Modal.Title>Signup</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
          >
            <Form.Control
              type="email"
              placeholder="name@example.com"
              required
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingPassword"
            label="Password"
            className="mb-3"
          >
            <Form.Control type="password" placeholder="Password" required />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingPassword"
            label="Retype Password"
            className="mb-3"
          >
            <Form.Control type="password" placeholder="Retype Password" />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingFirstName"
            label="First Name"
            className="mb-3"
          >
            <Form.Control type="text" placeholder="First Name" />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingLastName"
            label="Last Name"
            className="mb-3"
          >
            <Form.Control type="text" placeholder="Last Name" />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingPhoneNumber"
            label="Phone Number"
            className=""
          >
            <Form.Control type="text" placeholder="Phone Number" />
          </FloatingLabel>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          CANCEL
        </Button>
        <Button variant="primary" type="submit">
          SIGNUP
        </Button>
      </Modal.Footer>
    </>
  );
};

export default Signup;
