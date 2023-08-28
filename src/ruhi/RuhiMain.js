import React from 'react';
import Users from './Users';
import AddUser from './AddUser';

export default function RuhiMain() {
	return (
		<div className='text-center'>
		    <AddUser />
			<Users />
		</div>
	);
}
