import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import axios from "axios";

async function fetchTodo() {
  try {
    const response = await axios.get(" http://localhost:4000/fazlerabbi");
    // Handle the successful response here
    return response.data;
  } catch (error) {
    // Handle any errors here
    console.error(error);
  }
}

export default function Fazlul() {
  const init = {
    title: "",
    completed: false,
  };

  const [todo, setTodo] = useState(init);
  const [update, setUpdate] = useState(false);

  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodo,
  });

  const postTodo = async (e) => {
    e.preventDefault();
    if (!update) {
      try {
        await axios.post(" http://localhost:4000/fazlerabbi", todo);

        refetch();
        setTodo(init);
      } catch (error) {
        // Handle errors
        console.error("Error:", error);
      }
    } else {
      try {
        await axios.put(` http://localhost:4000/fazlerabbi/${todo.id}`, todo);
        setUpdate(false);
        refetch();
        setTodo(init);
      } catch (error) {
        // Handle errors
        console.error("Error:", error);
      }
    }
  };

  const dltTodo = async (id) => {
    try {
      await axios.delete(` http://localhost:4000/fazlerabbi/${id}`);
      refetch();
      setTodo(init);
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
    }
  };

  const updateTodo = async (title, id) => {
    setTodo({ ...todo, title, id });
    setUpdate(true);
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <section>
      {/* Heading */}
      <h1 className="text-center font-weight-bold mt-4   text-primay  p-5  ">
        Rect Query Practice Crud Project.
      </h1>
      {/* =======MainProject Start======= */}
      <div className="container  px-5 ">
        <form onSubmit={postTodo}>
          <Form.Label htmlFor="inputPassword5">Todo</Form.Label>
          <Form.Control
            type="search"
            onChange={(e) =>
              setTodo({
                ...todo,
                title: e.target.value,
                todo: data?.length + 1,
              })
            }
            value={todo.title}
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
          />
          <Button variant="warning" className="mt-2 " type="submit">
            {update ? "UPDATE TODO" : "ADD TODO"}
          </Button>{" "}
        </form>
      </div>

      {/* =======Todo Wrapper Start======= */}
      <div className="mt-5">
        <div className="container  px-5 ">
          <div className="row">
            {data.map((todo, index) => (
              <div
                key={index}
                className="col-sm-12 col-md-6 col-xl-4 mb-4 md:mb-0"
              >
                <Card style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Text>{todo.title}</Card.Text>

                    {/* icons */}
                    <div className="d-flex   justify-content-left align-items-center">
                      <PencilSquareIcon
                        onClick={() => updateTodo(todo.title, todo.id)}
                        style={{
                          height: "1.5rem",
                          width: "1.5rem",
                          cursor: "pointer",
                          marginRight: "10px",
                        }}
                      />

                      <TrashIcon
                        onClick={() => dltTodo(todo.id)}
                        style={{
                          height: "1.5rem",
                          width: "1.5rem",
                          cursor: "pointer",
                        }}
                        className="  text-danger "
                      />
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* =======Todo Wrapper End======= */}
      {/* =======MainProject End======= */}
    </section>
  );
}
