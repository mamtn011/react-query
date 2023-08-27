import React from "react";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import * as yup from "yup";

const MobinEdit = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      profession: "",
    },

    onSubmit: (values) => {},
  });
  return (
    <Form
      className="m-auto"
      onSubmit={formik.handleSubmit}
      style={{ width: "50vw" }}
    >
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          id="name"
          type="text"
          name="name"
          placeholder="Enter Your Name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Profession</Form.Label>
        <Form.Control
          id="profession"
          type="text"
          name="profession"
          placeholder="Enter Your Profession"
          onChange={formik.handleChange}
          value={formik.values.profession}
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
  );
};

export default MobinEdit;
