import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Button, Container, Form, Modal, Table } from "react-bootstrap";

const addPost = (post) => {
  return axios.post("https://jsonplaceholder.typicode.com/posts", post);
};

const editPost = (post) => {
  return axios.patch(
    `https://jsonplaceholder.typicode.com/posts/${post.id}`,
    post
  );
};


// querying
// useQuery by id => useQuery(['superheroes', heroId], fetchHeroData)
// parallel query

export default function Main() {
  const queryClient = useQueryClient();

  const {
    data: posts,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: () => axios.get("http://localhost:4000/kawsar"),
  });

  // create req
  //   const { mutate } = useMutation(addPost, {
  //     onSuccess: (data) => {
  //       // cache update
  //       queryClient.setQueryData("posts", (oldQueryData) => {
  //         return { ...oldQueryData, data: [...oldQueryData.data, data.data] };
  //       });
  //     },
  //   });

  // edit req
  //   const { mutate: editMutate } = useMutation(editPost, {
  //     onSuccess: (data) => {
  //       // cache update
  //       // queryClient.setQueryData("posts", (oldQueryData) => {
  //       //   return { ...oldQueryData, data: [...oldQueryData.data, data.data] };
  //       // });
  //     },
  //   });

  // delete req
  const { mutate: deleteMutate } = useMutation({
    mutationFn: (postId) => axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`),
    onSuccess: (data, id) => {
        // cache update
        queryClient.setQueryData(["todos"], (oldQueryData) => {
          const filteredTodos = oldQueryData.data.filter(
            (todo) => todo.id !== id
          );
          return { ...oldQueryData, data: [...filteredTodos] };
        });
      },
  });

  const [postData, setPostData] = useState({ title: "", body: "" });
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setPostData({});
  };
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleSave = () => {
    if (postData?.id) {
      // edit req fire
      //   editMutate(postData);
    } else {
      // api req fire
      //   mutate(postData);
    }

    // disabled modal
    setShow(false);
  };

  const handleChange = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (post) => {
    // show modal
    setShow(true);
    setPostData(post);
  };

  const handleDelete = (id) => {
    // delete req fire
    deleteMutate(id);
  };

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
            <th>
              <Button variant="primary">Create</Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {posts?.data.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title.slice(0, 30)}...</td>
              <td>{`${post.body.slice(0, 30)}`}...</td>
              <td>
                <Button variant="primary" style={{ marginRight: "25px" }}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(post.id)}>
                  Delete
                </Button>
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
          <Modal.Title>{postData.id ? "Edit" : "Create"} Post</Modal.Title>
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
                value={postData.title}
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
                value={postData.body}
              ></textarea>
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSave}>
              {postData.id ? "Edit" : "Save"}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </Container>
  );
}
