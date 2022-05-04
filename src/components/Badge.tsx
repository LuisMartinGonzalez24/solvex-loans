import { FC, memo } from 'react';
import classNames from 'classnames';
import { StatusLoan } from '.';

interface Props {
	status: StatusLoan;
}

const getStatusColor = (status: StatusLoan): string => {
	switch (status) {
		case StatusLoan.Active:
			return 'bg-blue-500';

		case StatusLoan.Paid:
			return 'bg-green-500';

		case StatusLoan.Rejected:
			return 'bg-red-500';

		default:
			return 'bg-gray-500';
	}
};

const Badge: FC<Props> = ({ status }) => (
	<span
		className={classNames(
			'flex items-center justify-center uppercase text-center font-bold text-xs text-white p-1 rounded-md',
			getStatusColor(status)
		)}
	>
		{status}
	</span>
);

export default memo(Badge);
