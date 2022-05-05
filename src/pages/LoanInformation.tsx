import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LoansTable } from '../components/LoansTable';
import LoanService from '../services/LoanService';
import { Loan } from '../services/LoanService.dto';

export const LoanInformation = () => {
	const { id } = useParams<'id'>();
	const [loan, setLoan] = useState<Loan | undefined>();
	const [showComponent, setShowComponent] = useState<boolean>(false);

	const handleGetLoan = async () => {
		try {
			const response = await LoanService.getLoan(id as string);
			setLoan(response.data.loan);
			setShowComponent(true);
		} catch (error) {
			throw error;
		}
	};

	useEffect(() => {
		handleGetLoan();
	}, []);

	if (!loan || !showComponent) return <div>Loan not found</div>;

	return (
		<div className='bg-gray-900 min-h-screen'>
			<nav className='shadow-md bg-medium-green'>
				<div className='container mx-auto py-4 flex flex-col md:flex-row items-center justify-between'>
					<Link
						to={'/'}
						className='mr-5 py-2 px-6 text-lg font-semibold uppercase bg-green-400 rounded-md text-dark-green hover:bg-gray-800 hover:text-white transition-colors duration-300'
					>
						Back to home
					</Link>
				</div>
			</nav>

			<div className='md:w-3/4 mx-auto mt-24 rounded-md overflow-hidden'>
				<LoansTable
					capital={loan.capital}
					interestRate={loan.interestRate}
					typeInterest={loan.typeInterest}
					period={loan.period}
				/>
			</div>
		</div>
	);
};
