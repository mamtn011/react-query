import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Button, Container, Form, Modal, Table } from "react-bootstrap";

// querying
// useQuery by id => useQuery(['superheroes', heroId], fetchHeroData)
// parallel query

export default function Main() {
  const queryClient = useQueryClient();
  const [todoData, setTodoData] = useState({ title: "", body: "" });
  const [show, setShow] = useState(false);

  // get api req
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

  // create api req
  const { mutate } = useMutation({
    mutationFn: (todo) => axios.post("http://localhost:4000/kawsar", todo),
    onSuccess: (data) => {
      // Ui cache update
      queryClient.setQueryData(["todos"], (oldQueryData) => {
        return { ...oldQueryData, data: [...oldQueryData.data, data.data] };
      });
    },
  });

  // edit api req
  const { mutate: editMutate } = useMutation({
    mutationFn: (todo) => axios.patch(`http://localhost:4000/kawsar/${todo.id}`, todo),
    onSuccess: (res) => {
        // UI cache update
        queryClient.setQueryData(["todos"], (oldQueryData) => {
            const foundTodo = oldQueryData.data.find((todo) => todo.id === res.data.id);
            foundTodo.title = res.data.title
            foundTodo.body = res.data.body
            return oldQueryData;
        });
    },
  });

  // delete api req
  const { mutate: deleteMutate } = useMutation({
    mutationFn: (todoId) =>
      axios.delete(`http://localhost:4000/kawsar/${todoId}`),
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

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setTodoData({});
  };
  const handleChange = (e) => {
    setTodoData({
      ...todoData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => e.preventDefault();

  const handleSave = () => {
    if (todoData?.id) {
      // edit req fire
      editMutate(todoData);
    } else {
      // api req fire
      mutate(todoData);
    }

    // disabled modal
    setShow(false);
  };

  const handleEdit = (todo) => {
    // show modal
    setShow(true);
    setTodoData(todo);
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
              <Button variant="primary" onClick={handleShow}>
                Create
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {posts?.data.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.title}</td>
              <td>{`${todo.body}`}</td>
              <td>
                <Button
                  variant="primary"
                  style={{ marginRight: "25px" }}
                  onClick={() => handleEdit(todo)}
                >
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(todo.id)}>
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
          <Modal.Title>{todoData.id ? "Edit" : "Create"} Todo</Modal.Title>
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
                value={todoData.title}
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
                value={todoData.body}
              ></textarea>
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSave}>
              {todoData.id ? "Edit" : "Save"}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </Container>
  );
}
