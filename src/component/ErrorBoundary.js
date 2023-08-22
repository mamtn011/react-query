import { useRouteError } from 'react-router';

export default function ErrorBoundary() {
	let error = useRouteError();
	const resErr = error.status === 404 ? '404: NOT FOUND' : ' ';
	return <h1 className=' text-center'>{resErr}</h1>;
}
