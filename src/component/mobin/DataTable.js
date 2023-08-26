import Table from "react-bootstrap/Table";
import { RiEditLine, RiDeleteBin6Line } from "react-icons/ri";
export default function DataTable({ datas }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Sl</th>
          <th>Name</th>
          <th>Profession</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {datas.map((data, idx) => (
          <tr key={data.id}>
            <td>{idx + 1}</td>
            <td>{data.name}</td>
            <td>{data.profession}</td>
            <td>
              <RiEditLine />
            </td>
            <td>
              <RiDeleteBin6Line />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
