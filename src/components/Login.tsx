import React from 'react';
import { Modal, Form, Button, FloatingLabel } from 'react-bootstrap';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

type Props = {
  handleClose: () => void;
};

interface ILogin {
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('*Must be a valid email address')
    .max(50, '*Email must be less than 50 characters')
    .required('*Email is required'),
  password: Yup.string()
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
});

const Login = (props: Props) => {
  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          // When button submits form and form is in the process of submitting, submit button is disabled
          setSubmitting(true);
          console.log(values);

          //DOESN'T WORK NOW. WAIT FOR SUNDAY
          // const { data } = await axios.post<ILogin>(
          //   'http://localhost:5000/login',
          //   values,
          //   {
          //     headers: {
          //       'content-type': 'application/json',
          //     },
          //   }
          // );
          // console.log('data post request', data);

          // Simulate submitting to database, shows us values submitted, resets form
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            resetForm();
            setSubmitting(false);
          }, 500);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          isValid,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Modal.Header>
              <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FloatingLabel
                controlId="loginEmail"
                label="Email address"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  isValid={touched.email && !errors.email}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </FloatingLabel>
              <FloatingLabel
                controlId="loginPassword"
                label="Password"
                className=""
              >
                <Form.Control
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  placeholder="Password"
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
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
        )}
      </Formik>
    </>
  );
};

export default Login;
