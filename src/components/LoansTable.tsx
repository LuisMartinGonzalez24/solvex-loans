import { FC, memo } from 'react';

interface Props {
	capital: number;
	interestRate: number;
	period: number;
	typeInterest: string;
}

export const LoansTable: FC<Props> = memo(
	({ capital, interestRate, period }) => {
		let cuotas = period;
		// let capital = 165000;

		// let interes = 0.100000001490116;
		//* Recordar cuando es mensual o anual
		let interes = Number((interestRate / 100).toPrecision(6));

		let interesBase = interes + 1;

		for (let i = 1; i < cuotas; i++) {
			interesBase = interesBase * (1 + interes);
		}

		let valorCuotaMensual = capital / ((1 - 1 / interesBase) / interes);

		//* Detallar todas las cuotas

		const data: {
			interestToPay: number;
			capitalSubscription: number;
			balance: number;
		}[] = [];

		let balance = capital;

		while (cuotas > 0) {
			const interestToPay = balance * interes;
			const capitalSubscription = valorCuotaMensual - interestToPay;
			balance -= capitalSubscription;

			data.push({
				interestToPay,
				capitalSubscription,
				balance,
			});

			--cuotas;
		}

		return (
			<table className='border-collapse w-full rounded-md'>
				<thead>
					<tr>
						<th className='p-3 font-bold uppercase bg-dark-green text-white border border-dark-green hidden lg:table-cell'>
							Period
						</th>
						<th className='p-3 font-bold uppercase bg-dark-green text-white border border-dark-green hidden lg:table-cell'>
							Monthly fee
						</th>
						<th className='p-3 font-bold uppercase bg-dark-green text-white border border-dark-green hidden lg:table-cell'>
							Interest to pay
						</th>
						<th className='p-3 font-bold uppercase bg-dark-green text-white border border-dark-green hidden lg:table-cell'>
							Capital subscription
						</th>
						<th className='p-3 font-bold uppercase bg-dark-green text-white border border-dark-green hidden lg:table-cell'>
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
									${valorCuotaMensual.toFixed(2)}
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
	}
);
