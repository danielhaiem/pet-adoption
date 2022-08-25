import React from 'react';
import { Form, Button, FloatingLabel, Container } from 'react-bootstrap';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import type { ISignUp } from '../types/types';
type Props = {};

const phoneRegExp =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
const passwordRegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/;

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('*Must be a valid email address')
    .max(50, '*Email must be less than 50 characters'),
  password: Yup.string()
    .min(6, 'Password should be of minimum 6 characters length')
    .matches(
      passwordRegExp,
      'Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
    ),
  fname: Yup.string()
    .min(2, '*Names must have at least 2 characters')
    .max(15, "*Names can't be longer than 15 characters"),
  lname: Yup.string()
    .min(2, '*Names must have at least 2 characters')
    .max(20, "*Names can't be longer than 20 characters"),

  tel: Yup.string().matches(phoneRegExp, '*Phone number is not valid'),
  bio: Yup.string().max(140, 'Bio can be max 140 characters'),
});

const Profile = (props: Props) => {
  console.log('Profile Page Rerender');
  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
          fname: '',
          lname: '',
          tel: '',
          bio: '',
        }}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);

          let userObj = {};
          if (values.email) Object.assign(userObj, { email: values.email });
          if (values.password)
            Object.assign(userObj, { password: values.password });
          if (values.fname)
            Object.assign(userObj, {
              fname:
                values.fname[0].toUpperCase() +
                values.fname.slice(1).toLowerCase(),
            });
          if (values.lname)
            Object.assign(userObj, {
              lname:
                values.lname[0].toUpperCase() +
                values.lname.slice(1).toLowerCase(),
            });
          if (values.tel) Object.assign(userObj, { tel: values.tel });
          if (values.bio) Object.assign(userObj, { bio: values.bio });

          console.log(userObj);
          setTimeout(() => {
            alert(JSON.stringify(userObj, null, 2));
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
            <Container>
              <h1 className="mb-3">Profile Settings</h1>
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
                  isValid={touched.password && !errors.password}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
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
              <FloatingLabel
                controlId="formPhoneNumber"
                label="Phone Number"
                className="mb-3"
              >
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

              <FloatingLabel controlId="formBio" label="Bio" className="mb-3">
                <Form.Control
                  type="text"
                  as="textarea"
                  name="bio"
                  value={values.bio}
                  onChange={handleChange}
                  placeholder="Enter bio..."
                  isValid={touched.bio && !errors.bio}
                  isInvalid={!!errors.bio}
                  style={{ height: '100px' }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.bio}
                </Form.Control.Feedback>
              </FloatingLabel>
              <div className="d-flex">
                <Button
                  variant="primary"
                  type="submit"
                  className="ms-auto"
                  disabled={
                    !values.email &&
                    !values.password &&
                    !values.fname &&
                    !values.lname &&
                    !values.tel &&
                    !values.bio
                  }
                >
                  SAVE
                </Button>
              </div>
            </Container>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Profile;
