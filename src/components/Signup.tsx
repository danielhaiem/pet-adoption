import { Modal, Form, Button, FloatingLabel } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import type { UserAuth } from '../types/types';
import { modalSignUpInStore, userAuthStore } from '../store';

type Props = {
  handleClose: () => void;
};

const phoneRegExp =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
const passwordRegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/;

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('*Must be a valid email address')
    .max(50, '*Email must be less than 50 characters')
    .required('*Email is required'),
  password: Yup.string()
    .min(6, 'Password should be of minimum 6 characters length')
    .matches(
      passwordRegExp,
      'Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
    )
    .required('Password is required'),
  repassword: Yup.string()
    .min(6, 'Password should be of minimum 6 characters length')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Password is required'),
  fname: Yup.string()
    .min(2, '*Names must have at least 2 characters')
    .max(15, "*Names can't be longer than 15 characters")
    .required('*Name is required'),
  lname: Yup.string()
    .min(2, '*Names must have at least 2 characters')
    .max(20, "*Names can't be longer than 20 characters")
    .required('*Name is required'),
  tel: Yup.string()
    .matches(phoneRegExp, '*Phone number is not valid')
    .required('*Phone number required'),
});

const Signup = (props: Props) => {
  const userStore = userAuthStore();
  const setCookieExists = userAuthStore((state) => state.setCookieExists);
  const setShow = modalSignUpInStore((state) => state.setShow);
  //Use React Query to save to synchronize information
  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
          repassword: '',
          fname: '',
          lname: '',
          tel: '',
        }}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          // When button submits form and form is in the process of submitting, submit button is disabled
          setSubmitting(true);

          const res = await axios.post('/signup', values);
          console.log(res.data);
          if (res.data) {
            const { data }: { data: UserAuth } = await axios.get(`/user/:id`, {
              withCredentials: true,
            });
            userStore.setToken(data);
            let cookie = document.cookie;
            if (cookie) {
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
              <Modal.Title>Signup</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FloatingLabel
                controlId="formEmail"
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
                  // onBlur={handleBlur}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </FloatingLabel>
              <FloatingLabel
                controlId="formPassword"
                label="Password"
                className="mb-3"
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
              <FloatingLabel
                controlId="formConfirmPassword"
                label="Confirm Password"
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  name="repassword"
                  value={values.repassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  isInvalid={!!errors.repassword}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.repassword}
                </Form.Control.Feedback>
              </FloatingLabel>
              <FloatingLabel
                controlId="formFirstName"
                label="First Name"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="fname"
                  value={values.fname}
                  onChange={handleChange}
                  placeholder="First Name"
                  isValid={touched.fname && !errors.fname}
                  isInvalid={!!errors.fname}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.fname}
                </Form.Control.Feedback>
              </FloatingLabel>
              <FloatingLabel
                controlId="formLastName"
                label="Last Name"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="lname"
                  value={values.lname}
                  onChange={handleChange}
                  placeholder="Last Name"
                  isValid={touched.lname && !errors.lname}
                  isInvalid={!!errors.lname}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lname}
                </Form.Control.Feedback>
              </FloatingLabel>
              <FloatingLabel controlId="formPhoneNumber" label="Phone Number">
                <Form.Control
                  type="text"
                  name="tel"
                  value={values.tel}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  isValid={touched.tel && !errors.tel}
                  isInvalid={!!errors.tel}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.tel}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={props.handleClose}>
                CANCEL
              </Button>
              <Button variant="primary" type="submit">
                SIGNUP
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Signup;
