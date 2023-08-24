import axios from "axios";
import { useState } from "react";
import { Button, Container, Form, Modal, Table } from "react-bootstrap";
import { useQuery } from "react-query";

const fetchPosts = () => {
  return axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5');
}

export default function Kawsar() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const {data: posts, isLoading, isError, isSuccess, error } = useQuery('posts', fetchPosts);

  let content = null;
  if (isLoading) {
    content = <h2>Loading....</h2>;
  }

  if (isError) {
    content = <h3>{error.message}</h3>;
  }

  if (isSuccess) {
    content = (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Body</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {posts?.data.map((todo) => (
            <>
              <tr keys={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.title.slice(0, 30)}...</td>
                <td>{`${todo.body.slice(0, 30)}`}...</td>
                <td>
                  <Button variant="primary" style={{ marginRight: "25px" }} onClick={handleShow}>
                    Create
                  </Button>
                  <Button variant="primary" style={{ marginRight: "25px" }}>
                    Edit
                  </Button>
                  <Button variant="danger">Delete</Button>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </Table>
    );
  }

  return <Container>
    
    {content}

    
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Post title"
              autoFocus
            />
          </Form.Group>
          
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Label>Body</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Post body" />
          </Form.Group>

        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
    
    </Container>;
}
