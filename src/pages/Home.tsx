import { FC } from 'react';
import { Sidebar } from '../components';
import LoanForm from '../components/LoanForm';

const HomePage: FC = () => {
	async function register(params: any) {
		console.log(params);
	}

	return (
		<main className='bg-gray-100 grid grid-cols-11 min-h-screen'>
			<div className='col-span-2 bg-white shadow-lg overflow-y-auto'>
				<div className='h-96'>
					<Sidebar className='px-4' loans={[]} />
				</div>
			</div>
			<div className='col-span-9'>
				<div className='mt-12'>
					<h1 className='text-center text-5xl uppercase font-medium text-gray-800'>
						Solvex Loans
					</h1>
				</div>
				<div className='max-w-3xl mx-auto mt-14 pb-10'>
					<LoanForm onSubmit={register} />
				</div>
			</div>
		</main>
	);
};

export default HomePage;
