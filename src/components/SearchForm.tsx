import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Formik, ErrorMessage, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useLocation, useSearchParams } from 'react-router-dom';

type Props = { setPets: React.Dispatch<React.SetStateAction<Pet>> };

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

const validationSchema = Yup.object().shape({
  type: Yup.string(),
});

const SearchForm = ({ setPets }: Props) => {
  let location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <>
      <Formik
        initialValues={{
          type: '',
        }}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          console.log(values);
          setSearchParams(values);
          console.log('searchparams:', searchParams);
          console.log('location: ', location);
          console.log(
            'specific location:',
            location.pathname + location.search
          );
          const fetchSearchResults = async () => {
            if (values.type) {
              const { data }: { data: Pet } = await axios.get('/api/pet', {
                params: values,
              });
              setPets(data);
            } else {
              const { data }: { data: Pet } = await axios.get('/api/pet');
              setPets(data);
            }
            // let query = location.search.length > 5 ? location.search : ""
            // const { data }: { data: Pet } = await axios.get(
            //   `/api/pet${query}`
            // );
            console.log('values: ', values);
            // setPets(data);
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
            className="d-flex flex-column gap-2"
          >
            <div className="d-flex gap-2">
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
              />
              <label className="form-check-label">Advanced Search</label>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SearchForm;
