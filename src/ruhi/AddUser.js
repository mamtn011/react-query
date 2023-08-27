import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';

const addUser = (addUserData) => {
	return axios.post('http://localhost:4000/ruhi', addUserData);
};
const UpdateUser = () => {
	return axios.put('http://localhost:4000/ruhi', );
};


export default function AddUser() {
	const [initialData, setInitialData] = useState({
		name: 'ruhi',
		email: 'zannay@gmail.com',
	});

	const queryClient = useQueryClient();

	const {
		mutate: userAdded,
		isLoading,
		error,
		data,
	} = useMutation({
		mutationFn: addUser,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['users'] });
		},
	});
	if (isLoading) return <h2>Loading...</h2>;
	if (error) return <h2>{error.message}</h2>;
	const handelSubmit = (e) => {
		e.preventDefault();
		userAdded({
			...initialData,
			id: data?.data.length + 1,
		});
	};
	return (
		<div>
			<form onSubmit={handelSubmit}>
				<input
					type='text'
					value={initialData.name}
					onChange={(e) => setInitialData(e.target.value)}
					placeholder='name'
				/>

				<input
					type='email'
					value={initialData.email}
					onChange={(e) => setInitialData(e.target.value)}
					placeholder='email'
				/>
				<button>submit</button>
			</form>
		</div>
	);
}
