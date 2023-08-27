import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getData = () => {
  return axios.get(`http://localhost:4000/mobin`);
};

const addData = (dataToAdd) => {
  return axios.post("http://localhost:4000/mobin", dataToAdd);
};

const deleteData = (dataId) => {
  return axios.delete(`http://localhost:4000/mobin/${dataId}`);
};

export const useGetEmployee = () =>
  useQuery({
    queryKey: ["employee"],
    queryFn: getData,
  });

export const useAddEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employee"] });
    },
  });
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
