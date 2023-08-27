import React from "react";
import { Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useGetSingleEmployee, useUpdateEmployee } from "./library";

const MobinEdit = () => {
  const { id } = useParams();
  const { data } = useGetSingleEmployee(id);
  const { mutate: UpdateData } = useUpdateEmployee();
  const navigate = useNavigate();

  return (
    <>
      {data && (
        <Formik
          initialValues={{
            name: data?.data.name,
            profession: data?.data.profession,
          }}
          onSubmit={(values) => {
            UpdateData({ id: data?.data.id, ...values });
            navigate("/mobin");
          }}
        >
          {(props) => (
            <Form
              className="m-auto"
              onSubmit={props.handleSubmit}
              style={{ width: "50vw" }}
            >
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter Your Name"
                  onChange={props.handleChange}
                  value={props.values.name}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Profession</Form.Label>
                <Form.Control
                  id="profession"
                  type="text"
                  name="profession"
                  placeholder="Enter Your Profession"
                  onChange={props.handleChange}
                  value={props.values.profession}
                />
              </Form.Group>
              <Button
                type="submit"
                variant="warning"
                style={{ width: "100%", marginBottom: "20px" }}
              >
                Update Employee
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default MobinEdit;
