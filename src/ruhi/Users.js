import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

const fetchedUsers = () => {
	return axios.get('http://localhost:4000/ruhi');
};

const deleteUser = (userId) => {
	return axios.delete(`http://localhost:4000/ruhi/${userId}`);
};

export default function Users() {
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

			{user?.data.map((elm) => {
				const { name, email, id } = elm;
				return (
					<div key={elm.id}>
						<p>
							Name: <span>{name}</span>
						</p>
						<p>
							Email:<span>{email}</span>
						</p>
						<button onClick={() => handelClick(id)}>Delete</button>
					</div>
				);
			})}
		</div>
	);
}
