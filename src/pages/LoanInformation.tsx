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
		<div>
			<nav className='shadow-md bg-white'>
				<div className='container mx-auto py-4 flex flex-col md:flex-row items-center justify-between'>
					<Link
						to={'/'}
						className='mr-5 py-2 px-6 text-lg uppercase bg-blue-600 text-white font-semibold text-center hover:bg-blue-900 transition-colors duration-300 rounded-lg'
					>
						Back to home
					</Link>
				</div>
			</nav>

			<div className='md:w-3/4 mx-auto mt-24'>
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
