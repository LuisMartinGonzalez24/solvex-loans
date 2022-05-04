import classNames from 'classnames';
import { FC } from 'react';
import { LoanCard, StatusLoan } from '.';
import { Loan } from './LoanCard';

interface Props {
	loans: Loan[];
	className?: string;
}

export const Sidebar: FC<Props> = ({ loans, className }) => {
	return (
		<aside className={classNames('w-full flex flex-col', className)}>
			<h3 className='text-center uppercase text-xl text-slate-800 py-2 font-semibold'>
				{loans.length ? 'Loans history' : 'Empty history'}
			</h3>
			<div className='flex flex-col'>
				{loans.length > 0 &&
					loans.map((loan, index) => (
						<LoanCard key={index} className='mb-4' loan={loan} />
					))}
			</div>
		</aside>
	);
};
