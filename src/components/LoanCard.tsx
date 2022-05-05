import { FC } from 'react';
import classNames from 'classnames';
import { Badge } from './Badge';
import { Loan } from '../services/LoanService.dto';

interface Props {
	loan: Loan;
	className?: string;
	callBack(id: string): void;
}

export const LoanCard: FC<Props> = (props) => (
	<button
		onClick={() => props.callBack(props.loan.id)}
		className={classNames(
			'bg-gray-900 text-white shadow-md rounded-md p-4 border-2 border-transparent hover:border-blue-400 transition-colors duration-200',
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
