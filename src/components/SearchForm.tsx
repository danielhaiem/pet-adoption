import { useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useStore } from "../store";
import { useSearchParams } from "react-router-dom";
import type { Pet } from "../types/types";

type Props = {};

const validationSchema = Yup.object().shape({
  type: Yup.string(),
  adoptionStatus: Yup.string(),
  height: Yup.string(),
  weight: Yup.string(),
  name: Yup.string(),
});

const SearchForm = (props: Props) => {
  const store = useStore();
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <>
      <Formik
        initialValues={{
          type: "",
          adoptionStatus: "",
          height: "",
          weight: "",
          name: "",
        }}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);

          const searchObj = {};
          if (values.type) Object.assign(searchObj, { type: values.type });
          if (values.adoptionStatus)
            Object.assign(searchObj, { adoptionStatus: values.adoptionStatus });
          if (values.height)
            Object.assign(searchObj, { height: values.height });
          if (values.weight)
            Object.assign(searchObj, { weight: values.weight });
          if (values.name) Object.assign(searchObj, { name: values.name });

          const fetchSearchResults = async () => {
            if (
              values.type ||
              values.adoptionStatus ||
              values.height ||
              values.weight ||
              values.name
            ) {
              const { data }: { data: Pet } = await axios.get("/pet", {
                params: searchObj,
              });
              store.setPets(data);
            } else {
              const { data }: { data: Pet } = await axios.get("/pet");
              store.setPets(data);
            }
          };
          fetchSearchResults();
          setSearchParams(searchObj);
          resetForm();
          setSubmitting(false);
        }}
      >
        {({ handleSubmit }) => (
          <Form
            noValidate
            onSubmit={handleSubmit}
            className="d-flex flex-column gap-1 mb-3"
          >
            <div className="d-flex flex-row gap-2">
              <Field as="select" name="type" className="form-select ">
                <option>Filter by type:</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
              </Field>

              <Button variant="outline-success" type="submit">
                Search
              </Button>
            </div>
            <div className="form-check form-switch ms-auto">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
                onClick={() => setAdvancedSearch(() => !advancedSearch)}
              />
              <label className="form-check-label">Advanced Search</label>
            </div>
            {advancedSearch && (
              <Row className="gap-2">
                <Col sm={12} md={6} lg={4} xl={4}>
                  <label className="form-label" htmlFor="adoptionStatus">
                    Adoption Status:
                  </label>
                  <Field
                    as="select"
                    name="adoptionStatus"
                    className="form-select "
                  >
                    <option>Any:</option>
                    <option value="Adopted">Adopted</option>
                    <option value="Fostered">Fostered</option>
                    <option value="Available">Available</option>
                  </Field>
                </Col>
                <Col sm={12} md={6} lg={4} xl={4}>
                  <label className="form-label" htmlFor="height">
                    Height (in):
                  </label>
                  <Field as="select" name="height" className="form-select ">
                    <option>Any:</option>
                    <option value="small">Small(0-25 in)</option>
                    <option value="medium">Medium(26-60 in)</option>
                    <option value="large">Large(61+ in)</option>
                  </Field>
                </Col>
                <Col sm={12} md={6} lg={4} xl={4}>
                  <label className="form-label" htmlFor="weight">
                    Weight (lbs):
                  </label>
                  <Field as="select" name="weight" className="form-select ">
                    <option>Any:</option>
                    <option value="small">Small(0-25 lbs)</option>
                    <option value="medium">Medium(26-60 lbs)</option>
                    <option value="large">Large(61+ lbs)</option>
                  </Field>
                </Col>
                <Col sm={12} md={6} lg={4} xl={4}>
                  <label className="form-label" htmlFor="name">
                    Name:
                  </label>
                  <Field
                    type="text"
                    name="name"
                    className="form-input form-control"
                    placeholder="Enter pet name i.e. Rajah"
                  />
                </Col>
              </Row>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SearchForm;
