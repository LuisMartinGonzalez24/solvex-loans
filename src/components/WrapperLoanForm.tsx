import { useEffect, useRef, useState } from 'react';
import LoanService from '../services/LoanService';
import ClientService from '../services/ClientService';
import ClientCombobox, { Client } from '../components/Combobox';
import LoanForm from './LoanForm';
import { LoanFields } from '../interfaces/YupValidationSchemas';
import { AxiosError } from 'axios';

const WrapperLoanForm = () => {
	const [clients, setClients] = useState<Client[]>([]);
	const [selected, setSelected] = useState<Client>({ id: '', name: '' });

	const getClients = () => {
		ClientService.getClients().then((res) => {
			console.log(res.data);
			setSelected({
				...res.data.clients[0],
				name: res.data.clients[0].client,
			});
			setClients(
				res.data.clients.map((client) => ({
					...client,
					name: client.client,
				}))
			);
		});
	};

	useEffect(() => {
		getClients();
	}, []);

	const registerLoan = async ({ loanAmount, ...rest }: LoanFields) => {
		try {
			await LoanService.registerLoan({
				...rest,
				clientId: '',
				capital: loanAmount,
			});
			console.log({ loanAmount, ...rest });
		} catch (error) {
			const axiosError = error as AxiosError;

			if (axiosError.response) {
				// console.log(axiosError.response.data);
				return;
			}

			console.log(error);
		}
	};

	return (
		<div>
			{clients.length > 0 && (
				<ClientCombobox
					clients={clients}
					selected={selected}
					setSelected={setSelected}
				/>
			)}
			<LoanForm onSubmit={registerLoan} />
		</div>
	);
};
export default WrapperLoanForm;
