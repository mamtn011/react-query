import Table from "react-bootstrap/Table";
import { RiEditLine, RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useDeleteEmployee } from "./library";

export default function DataTable({ datas }) {
  const { mutate: DeleteData } = useDeleteEmployee();
  // delete function
  const handleDelete = (e) => {
    const id = e.target.dataset.id || e.target.parentElement.dataset.id;
    DeleteData(id);
  };

  return (
    <Table striped bordered className="m-auto" style={{ width: "90vw" }}>
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
              <Link to={`/mobin-edit/${data.id}`}>
                <RiEditLine style={{ cursor: "pointer" }} />
              </Link>
            </td>
            <td>
              <RiDeleteBin6Line
                onClick={handleDelete}
                data-id={data.id}
                style={{ cursor: "pointer" }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
