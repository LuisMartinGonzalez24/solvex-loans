import { FC, useState } from 'react';
import { Sidebar } from '../components';
import ClientForm from '../components/ClientForm';
import WrapperLoanForm from '../components/WrapperLoanForm';
import { ClientFields } from '../interfaces/YupValidationSchemas';
import ClientService from '../services/ClientService';

const HomePage: FC = () => {
	const [selectForm, setSelectForm] = useState<'client' | 'loan'>('client');

	const registerClient = async ({ firstName, lastName }: ClientFields) => {
		try {
			await ClientService.registerClient(firstName, lastName);
			console.log('Client registered');
		} catch (error) {}
	};

	const handleSelectForm = (form: 'client' | 'loan') => {
		if (form === selectForm) {
			return;
		}

		setSelectForm(form);
	};

	return (
		<main className='bg-gray-100 grid grid-cols-11 min-h-screen'>
			<div className='col-span-2 bg-white shadow-lg overflow-y-auto'>
				<div className='h-96'>
					<Sidebar className='px-4' loans={[]} />
				</div>
			</div>
			<div className='col-span-9'>
				<div className='mt-12'>
					<h1 className='text-center text-5xl uppercase font-bold text-gray-800'>
						Solvex Loans
					</h1>
				</div>
				<div className='max-w-3xl mx-auto mt-14 pb-10'>
					<div className='flex'>
						<button
							type='button'
							onClick={() => handleSelectForm('client')}
							className='mr-4 uppercase py-2 px-4 font-semibold text-center flex items-center justify-center bg-gray-800 rounded-md text-white'
						>
							client form
						</button>

						<button
							type='button'
							onClick={() => handleSelectForm('loan')}
							className='uppercase py-2 px-4 font-semibold text-center flex items-center justify-center bg-gray-800 rounded-md text-white'
						>
							loan form
						</button>
					</div>

					{selectForm === 'client' ? (
						<ClientForm onSubmit={registerClient} />
					) : (
						<WrapperLoanForm />
					)}
				</div>
			</div>
		</main>
	);
};

export default HomePage;
