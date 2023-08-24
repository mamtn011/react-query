import axios from "axios";
import { Button, Container, Table } from "react-bootstrap";
import { useQuery } from "react-query";

const fetchTodos = () => {
  return axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5');
}

export default function Kawsar() {
  const {data: todos, isLoading, isError, isSuccess, error } = useQuery('todos', fetchTodos);

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
            <th>Completed</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todos?.data.map((todo) => (
            <>
              <tr keys={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.title}</td>
                <td>{`${todo.completed}`}</td>
                <td>
                  <Button variant="primary" style={{ marginRight: "25px" }}>
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

  return <Container>{content}</Container>;
}
