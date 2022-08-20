import { useState } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import useStore from '../store';

type Props = {};

type Pet = {
  _id: string;
  type: string;
  name: string;
  adoptionStatus: string;
  picture: string;
  height: number;
  weight: number;
  color: string;
  bio: string;
  hypoallergnic: boolean;
  dietery: [];
  breed: string;
}[];

const isNumberRegEx = /^\d+$/s;

const validationSchema = Yup.object().shape({
  type: Yup.string(),
  adoptionStatus: Yup.string(),
  height: Yup.string().matches(isNumberRegEx, 'Height is not valid'),
  weight: Yup.string().matches(isNumberRegEx, 'Weight is not valid'),
  name: Yup.string(),
});

const SearchForm = (props: Props) => {
  const store = useStore();
  const [advancedSearch, setAdvancedSearch] = useState(false);
  return (
    <>
      <Formik
        initialValues={{
          type: '',
          adoptionStatus: '',
          height: '',
          weight: '',
          name: '',
        }}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);

          let searchObj = {};
          if (values.type) Object.assign(searchObj, { type: values.type });
          if (values.adoptionStatus)
            Object.assign(searchObj, { adoptionStatus: values.adoptionStatus });
          if (values.height)
            Object.assign(searchObj, { height: Number(values.height) });
          if (values.weight)
            Object.assign(searchObj, { weight: Number(values.weight) });
          if (values.name)
            Object.assign(searchObj, {
              name:
                values.name[0].toUpperCase() +
                values.name.slice(1).toLowerCase(),
            });

          const fetchSearchResults = async () => {
            if (
              values.type ||
              values.adoptionStatus ||
              values.height ||
              values.weight ||
              values.name
            ) {
              const { data }: { data: Pet } = await axios.get('/api/pet', {
                params: searchObj,
              });
              store.setPets(data);
            } else {
              const { data }: { data: Pet } = await axios.get('/api/pet');
              store.setPets(data);
            }

            console.log('values: ', values);
          };
          fetchSearchResults();

          resetForm();
          setSubmitting(false);
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
                    Height (cm):
                  </label>
                  <Field
                    type="text"
                    name="height"
                    className="form-input form-control"
                    placeholder="Enter number i.e. 5"
                  />
                  {errors.height && touched.height ? (
                    <div className="text-danger mt-1">
                      Height must be a whole number
                    </div>
                  ) : null}
                </Col>
                <Col sm={12} md={6} lg={4} xl={4}>
                  <label className="form-label" htmlFor="weight">
                    Weight (lbs):
                  </label>
                  <Field
                    type="text"
                    name="weight"
                    className="form-input form-control"
                    placeholder="Enter number i.e. 25"
                  />
                  {errors.weight && touched.weight ? (
                    <div className="text-danger mt-1">
                      Weight must be a whole number
                    </div>
                  ) : null}
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
