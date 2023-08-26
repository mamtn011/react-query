import React from "react";
import { Form, Button } from "react-bootstrap";
const InputForm = () => {
  return (
    <Form className="m-5">
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Your Name" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Profession</Form.Label>
        <Form.Control type="text" placeholder="Enter Your Profession" />
      </Form.Group>
      <Button type="submit">Add Employee</Button>
    </Form>
  );
};

export default InputForm;
