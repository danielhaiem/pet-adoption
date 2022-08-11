import React from 'react';
import { Modal, Form, Button, FloatingLabel } from 'react-bootstrap';

type Props = {
  handleClose: () => void;
};

const Login = (props: Props) => {
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('test login');
    // login(email, password);
    // setPassword("");
  };
  return (
    <>
      <Form onSubmit={handleLogin}>
        <Modal.Header>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
          >
            <Form.Control type="email" placeholder="name@example.com" />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingPassword"
            label="Password"
            className=""
          >
            <Form.Control type="password" placeholder="Password" />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            CANCEL
          </Button>
          <Button variant="primary" type="submit">
            LOGIN
          </Button>
        </Modal.Footer>
      </Form>
    </>
  );
};

export default Login;
