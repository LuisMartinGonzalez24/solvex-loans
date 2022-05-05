import { FC, useState } from 'react';
import { Sidebar, StatusLoan } from '../components';
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
		<main className='bg-gray-900 grid grid-cols-12 min-h-screen'>
			<div className='col-span-3 bg-medium-green shadow-md overflow-y-auto'>
				<div className='h-96'>
					<Sidebar className='px-4' loans={[]} />
				</div>
			</div>
			<div className='col-span-9'>
				<div className='mt-12'>
					<h1 className='text-center text-6xl text-teal-400 uppercase font-bold'>
						Solvex <span className='text-white'>Loans</span>
					</h1>
				</div>
				<div className='max-w-3xl mx-auto mt-14 pb-10'>
					<div className='flex mb-12'>
						<button
							type='button'
							onClick={() => handleSelectForm('client')}
							className='text-lg mr-4 uppercase py-2 px-4 font-semibold text-center flex items-center justify-center bg-green-400 rounded-md text-dark-green hover:bg-dark-green hover:text-white transition-colors duration-300'
						>
							client form
						</button>

						<button
							type='button'
							onClick={() => handleSelectForm('loan')}
							className='text-lg uppercase py-2 px-4 font-semibold text-center flex items-center justify-center bg-green-400 rounded-md text-dark-green hover:bg-dark-green hover:text-white transition-colors duration-300'
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
