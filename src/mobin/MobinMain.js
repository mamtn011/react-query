import DataTable from './DataTable';
import InputForm from './InputForm';
import { useGetEmployee } from './library';
export default function MobinMain() {
	const { isLoading, data, isSuccess, isError, error } = useGetEmployee();
	if (isLoading) {
		return <h2>Loading...</h2>;
	}
	if (isError) {
		return <h2>{error.message}</h2>;
	}
	return (
		<div>
			<InputForm />
			{isSuccess && <DataTable datas={data?.data} />}
		</div>
	);
}
