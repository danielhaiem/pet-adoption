import React, { useState } from 'react';
import { Modal, Tab, Tabs } from 'react-bootstrap';
import Login from './Login';
import Signup from './Signup';

type Props = {};

const FormModal = (props: Props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div onClick={handleShow}>LOGIN</div>
      <div onClick={(e) => e.stopPropagation()}>
        <Modal show={show} onHide={handleClose}>
          <Tabs
            defaultActiveKey="login"
            id="justify-tab-example"
            className="mb-3  d-flex flex-row"
            justify
          >
            <Tab eventKey="signup" title="SIGNUP">
              <Signup handleClose={handleClose} />
            </Tab>
            <Tab eventKey="login" title="LOGIN">
              <Login handleClose={handleClose} />
            </Tab>
          </Tabs>
        </Modal>
      </div>
    </>
  );
};

export default FormModal;
