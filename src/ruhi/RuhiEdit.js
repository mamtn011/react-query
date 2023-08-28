import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateUser = (updateData) => {
	return axios.put(`http://localhost:4000/ruhi/${updateData.id}`);
};

export default function RuhiEdit() {
	const [updateData, setUpdateData] = useState({
		name: '',
		email: '',
	});
	
	
	

	

	const handelSubmit = (updateData) => {
		
	};
	return (
		<div>
			<form onSubmit={handelSubmit}>
				<input
					type='text'
					value={updateData.name}
					onChange={(e) => setUpdateData(e.target.value)}
					placeholder='name'
				/>

				<input
					type='email'
					value={updateData.email}
					onChange={(e) => setUpdateData(e.target.value)}
					placeholder='email'
				/>
				<button>update</button>
			</form>
		</div>
	);
}
