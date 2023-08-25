import axios from "axios";
import { useState } from "react";
import { Button, Container, Form, Modal, Table } from "react-bootstrap";
import { useMutation, useQuery, useQueryClient } from "react-query";

const fetchPosts = () => {
  return axios.get("https://jsonplaceholder.typicode.com/posts");
};

const addPost = (post) => {
  return axios.post("https://jsonplaceholder.typicode.com/posts", post);
};

export default function Kawsar() {
  const queryClient = useQueryClient();
  const {
    mutate,
    isLoading: addPostIsLoading,
    isError: addPostIsError,
    error: addPostError,
    isSuccess: addPostIsSuccess,
  } = useMutation(addPost, {
    onSuccess: (data) => {
      // cache update
      queryClient.setQueryData("posts", (oldQueryData) => {
        return { ...oldQueryData, data: [...oldQueryData.data, data.data] };
      });
    },
  });
  const [postData, setPostData] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setPostData({});
  };
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleCreate = () => {
    // api req fire
    mutate(postData);

    // disabled modal
    setShow(false);
  };

  const handleChange = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };

  const {
    data: posts,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useQuery("posts", fetchPosts, {
    select: (res) => {
      const filteredPosts = res.data.filter((post) => post?.id > 98);
      const modifiedRes = { ...res, data: filteredPosts };
      return modifiedRes;
    },
  });

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
          {posts?.data.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title.slice(0, 30)}...</td>
              <td>{`${post.body.slice(0, 30)}`}...</td>
              <td>
                <Button
                  variant="primary"
                  style={{ marginRight: "25px" }}
                  onClick={handleShow}
                >
                  Create
                </Button>
                <Button variant="primary" style={{ marginRight: "25px" }}>
                  Edit
                </Button>
                <Button variant="danger">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }

  return (
    <Container>
      {content}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Post</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <input
                className="form-control"
                type="text"
                name="title"
                id="title"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Body</Form.Label>
              <textarea
                className="form-control"
                name="body"
                id="body"
                cols="30"
                rows="3"
                onChange={handleChange}
              ></textarea>
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleCreate}>
              Save
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </Container>
  );
}
