/* eslint-disable no-useless-escape */
import { Form, Button, FloatingLabel, Container } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import type { UserAuth } from "../types/types";
import { alertsStore, userAuthStore } from "../store";
import axios from "axios";
import { BASE_URL } from "../utils/globals";

type Props = {};

const phoneRegExp =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
const passwordRegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/;

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("*Must be a valid email address")
    .max(50, "*Email must be less than 50 characters"),
  password: Yup.string()
    .min(6, "Password should be of minimum 6 characters length")
    .matches(
      passwordRegExp,
      "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  repassword: Yup.string()
    .min(6, "Password should be of minimum 6 characters length")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  fname: Yup.string()
    .min(2, "*Names must have at least 2 characters")
    .max(15, "*Names can't be longer than 15 characters"),
  lname: Yup.string()
    .min(2, "*Names must have at least 2 characters")
    .max(20, "*Names can't be longer than 20 characters"),
  tel: Yup.string().matches(phoneRegExp, "*Phone number is not valid"),
  bio: Yup.string().max(140, "Bio can be max 140 characters"),
});

const Profile = (props: Props) => {
  const { userInfo, setUserInfo } = userAuthStore();
  const setAlertShow = alertsStore((state) => state.setAlertShow);
  const setAlertBool = alertsStore((state) => state.setAlertBool);
  const setErrorMessage = alertsStore((state) => state.setErrorMessage);
  const setSuccessMessage = alertsStore((state) => state.setSuccessMessage);

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          email: userInfo.email || "",
          password: "",
          repassword: "",
          fname: userInfo.fname || "",
          lname: userInfo.lname || "",
          tel: userInfo.tel || "",
          bio: userInfo.bio || "",
        }}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            setSubmitting(true);

            let userObj = {};
            if (values.email && values.email !== userInfo.email)
              Object.assign(userObj, { email: values.email });
            if (values.password && values.repassword) {
              Object.assign(userObj, { password: values.password });
              Object.assign(userObj, { repassword: values.repassword });
            }
            if (values.fname && values.fname !== userInfo.fname)
              Object.assign(userObj, {
                fname: values.fname,
              });
            if (values.lname && values.lname !== userInfo.lname)
              Object.assign(userObj, {
                lname: values.lname,
              });
            if (values.tel && values.tel !== userInfo.tel)
              Object.assign(userObj, { tel: values.tel });
            if (values.bio && values.bio !== userInfo.bio)
              Object.assign(userObj, { bio: values.bio });

            const res = await axios.put(`${BASE_URL}/user/id`, userObj, {
              withCredentials: true,
            });
            if (res.data) {
              const { data }: { data: UserAuth } = await axios.get(
                `${BASE_URL}/user/id`,
                {
                  withCredentials: true,
                }
              );
              setUserInfo(data);
              setSuccessMessage("Update successful!");
              setAlertBool(true);
              setAlertShow(true);
            }

            resetForm();
            setSubmitting(false);
          } catch (error: any) {
            setErrorMessage(error.response.data);
            setAlertShow(true);
          }
        }}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
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
                  style={{ height: "100px" }}
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
                    !values.repassword &&
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
