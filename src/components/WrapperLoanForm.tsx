import { useMemo, useState } from 'react';
import LoanService from '../services/LoanService';
import ClientService from '../services/ClientService';
import { Client, ClientCombobox } from './Combobox';
import { LoanForm } from './LoanForm';
import { LoanFields } from '../interfaces/YupValidationSchemas';
import { AxiosError } from 'axios';
import { useAppContext } from '../context/AppProvider';

export const WrapperLoanForm = () => {
	const {
		appState: { clients },
		dispatch,
	} = useAppContext();
	const [selectedClient, setSelectedClient] = useState<Client>({
		id: '',
		name: '',
	});

	const clientList = useMemo(() => {
		return clients.map((client) => ({
			...client,
			name: client.client,
		}));
	}, [clients]);

	const registerLoan = async ({ loanAmount, ...rest }: LoanFields) => {
		try {
			console.log('llega aqui: ', { loanAmount, ...rest });

			const response = await LoanService.registerLoan({
				...rest,
				clientId: selectedClient.id,
				capital: loanAmount,
			});

			console.log(response.data.loan);

			dispatch({
				type: '[loan] add loan',
				payload: response.data.loan,
			});
		} catch (error) {
			const axiosError = error as AxiosError;

			if (axiosError.response) {
				console.log(axiosError.response.data);
				return;
			}

			console.log(error);
		}
	};

	return (
		<div>
			<div>
				<label className='text-white font-bold text-base mb-4 block'>
					Select a Client
				</label>
				{clients.length > 0 && (
					<ClientCombobox
						clients={clientList}
						selected={selectedClient}
						setSelected={setSelectedClient}
					/>
				)}
			</div>
			<LoanForm onSubmit={registerLoan} />
		</div>
	);
};
