import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { LoanCard } from '.';
import { Loan } from '../services/LoanService.dto';

interface Props {
	loans: Loan[];
	className?: string;
}

export const Sidebar: FC<Props> = ({ loans, className }) => {
	const navigate = useNavigate();

	const getLoanInformation = (id: string) => {
		navigate(`/loan/${id}`);
	};

	return (
		<aside className={classNames('w-full flex flex-col', className)}>
			<h3 className='text-center uppercase text-2xl text-white py-6 font-bold'>
				{loans.length ? 'Loans history' : 'Empty history'}
			</h3>
			<div className='flex flex-col'>
				{loans.length > 0 &&
					loans.map((loan, index) => (
						<LoanCard
							key={index}
							className='mb-4'
							loan={loan}
							callBack={getLoanInformation}
						/>
					))}
			</div>
		</aside>
	);
};
