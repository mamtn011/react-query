import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import DataTable from "./mobin/DataTable";
import InputForm from "./mobin/InputForm";
const getData = () => {
  return axios.get("http://localhost:4000/employees");
};

const addData = (dataToAdd) => {
  return axios.post("http://localhost:4000/employees", dataToAdd);
};

export default function Mobin() {
  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: ["employee"],
    queryFn: getData,
  });
  const {
    mutate: AddData,
    isError: isAddError,
    error: addError,
  } = useMutation({ mutationFn: addData });
  const handleAddData = () => {
    AddData({ id: 5, name: "Ali Hossain", profession: "Designer" });
  };
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }
  return (
    <div>
      {/* {data?.data.map((epmloyee) => (
        <h3 key={epmloyee.id}>{epmloyee.name}</h3>
      ))}
      <button onClick={handleAddData}>Add New</button> */}
      <InputForm />
      {isSuccess && <DataTable datas={data?.data} />}
    </div>
  );
}
