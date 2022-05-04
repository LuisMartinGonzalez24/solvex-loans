import { FC } from 'react';

interface Props {
	capital: number;
	interestRate: number;
	period: number;
	typeInterest: string;
}

export const LoansTable: FC<Props> = ({ capital, interestRate, period }) => {
	interestRate = interestRate / 100;

	const monthlyFee = (
		(capital * interestRate) /
		(1 - Math.pow(1 + interestRate, -period))
	).toFixed(2);

	let balance = capital;
	const data: {
		interestToPay: number;
		capitalSubscription: number;
		balance: number;
	}[] = [];

	while (period > 0) {
		const interestToPay = balance * interestRate;
		const capitalSubscription = Number(monthlyFee) - interestToPay;
		balance -= capitalSubscription;

		data.push({
			interestToPay,
			capitalSubscription,
			balance,
		});

		--period;
	}

	return (
		<table className='border-collapse w-full'>
			<thead>
				<tr>
					<th className='p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell'>
						Period
					</th>
					<th className='p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell'>
						Monthly fee
					</th>
					<th className='p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell'>
						Interest to pay
					</th>
					<th className='p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell'>
						Capital subscription
					</th>
					<th className='p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell'>
						Balance
					</th>
				</tr>
			</thead>
			<tbody>
				{data.map(
					(
						{ interestToPay, capitalSubscription, balance },
						index
					) => (
						<tr
							key={index}
							className='bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0'
						>
							<td className='w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static'>
								{index + 1}
							</td>
							<td className='w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static'>
								${monthlyFee}
							</td>
							<td className='w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static'>
								${interestToPay.toFixed(2)}
							</td>
							<td className='w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static'>
								${capitalSubscription.toFixed(2)}
							</td>
							<td className='w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static'>
								$
								{Number(balance.toFixed(2)) < 1
									? 0
									: balance.toFixed(2)}
							</td>
						</tr>
					)
				)}
			</tbody>
		</table>
	);
};
