import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// get all data
const getData = () => {
  return axios.get(`http://localhost:4000/mobin`);
};
export const useGetEmployee = () =>
  useQuery({
    queryKey: ["employee"],
    queryFn: getData,
  });

// get single data by id
const getSingleData = (id) => {
  return axios.get(`http://localhost:4000/mobin/${id}`);
};
export const useGetSingleEmployee = (id) =>
  useQuery({
    queryKey: ["employee", id],
    queryFn: () => getSingleData(id),
  });

// Add data to server
const addData = (dataToAdd) => {
  return axios.post("http://localhost:4000/mobin", dataToAdd);
};
export const useAddEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employee"] });
    },
  });
};

// delete data from server
const deleteData = (dataId) => {
  return axios.delete(`http://localhost:4000/mobin/${dataId}`);
};
export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employee"] });
    },
  });
};

// update data form server
const updateData = (dataToUpdate) => {
  return axios.put(
    `http://localhost:4000/mobin/${dataToUpdate.id}`,
    dataToUpdate
  );
};
export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employee"] });
    },
  });
};
