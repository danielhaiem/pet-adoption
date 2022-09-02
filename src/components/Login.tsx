import { Modal, Form, Button, FloatingLabel } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { modalSignUpInStore, userAuthStore } from '../store';
import type { UserAuth } from '../types/types';

type Props = {
  handleClose: () => void;
};

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
  const userStore = userAuthStore();
  const setCookieExists = userAuthStore((state) => state.setCookieExists);
  const setShow = modalSignUpInStore((state) => state.setShow);

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
          setSubmitting(true);

          const { data }: { data: UserAuth } = await axios.post(
            '/login',
            values,
            {
              withCredentials: true,
            }
          );

          if (data) {
            const { data }: { data: UserAuth } = await axios.get(`/user/:id`, {
              withCredentials: true,
            });
            userStore.setToken(data);
            if (data) {
              setCookieExists(true);
            }
          }

          resetForm();
          setSubmitting(false);
          setShow(false);
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
