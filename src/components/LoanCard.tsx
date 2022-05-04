import classNames from 'classnames';
import { FC } from 'react';
import Badge from './Badge';

export enum StatusLoan {
	Active = 'Active',
	Paid = 'Paid',
	Rejected = 'Rejected',
}

export type Loan = {
	status: StatusLoan;
	client: string;
	capital: number;
	interestRate: number;
	typeInterest: string;
};

interface Props {
	loan: Loan;
	className?: string;
}

export const LoanCard: FC<Props> = (props) => (
	<button
		className={classNames(
			'bg-gray-800 text-white shadow-md rounded-md p-4 border-2 border-transparent hover:border-blue-400 transition-colors duration-200',
			props.className
		)}
	>
		<div className='flex items-center justify-between mb-3'>
			<span className='font-bold'>{props.loan.client}</span>
			<Badge status={props.loan.status} />
		</div>

		<div className='flex items-center justify-between'>
			<span>${props.loan.capital}</span>
			<span>{props.loan.interestRate}%</span>
		</div>
	</button>
);
