import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import AddUser from './AddUser';

const fetchedUsers = () => {
	return axios.get('http://localhost:4000/ruhi');
};

const deleteUser = (userId) => {
	return axios.delete(`http://localhost:4000/ruhi/${userId}`);
};

export default function Users({ initialData }) {
	const queryClient = useQueryClient();

	const {
		isLoading,
		data: user,
		error,
	} = useQuery({
		queryKey: ['users'],
		queryFn: fetchedUsers,
	});
	const { mutate: userDeleted } = useMutation({
		mutationFn: deleteUser,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['users'] });
		},
	});
	const handelClick = (id) => {
		userDeleted(id);
	};

	if (isLoading) return <h2>Loading...</h2>;
	if (error) return <h2>{error.message}</h2>;

	return (
		<div>
			<h1>All Users</h1>
			{<AddUser />}
			{user?.data.map((elm) => {
				const { name, email, id } = elm;
				return (
					<div key={elm.id}>
						Name- <p>{name}</p>
						Email- <p>{email}</p>
						<button onClick={() => handelClick(id)}>Delete</button>
					</div>
				);
			})}
		</div>
	);
}
