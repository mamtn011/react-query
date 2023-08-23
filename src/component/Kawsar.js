import { Button, Container, Table } from "react-bootstrap";
import friends from "../utils/fakeData";

export default function Kawsar() {
  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {friends.map((friend) => (
            <>
              <tr keys={friend.id}>
                <td>{friend.id}</td>
                <td>{friend.firstName}</td>
                <td>{friend.lastName}</td>
                <td>{friend.userName}</td>
                <td>{friend.email}</td>
                <td>
                  <Button variant="primary" style={{marginRight: '25px'}}>Edit</Button>
                  <Button variant="danger">Delete</Button>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
