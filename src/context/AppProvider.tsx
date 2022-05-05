import React, {
	FC,
	Dispatch,
	createContext,
	useReducer,
	useContext,
	useEffect,
} from 'react';
import ClientService from '../services/ClientService';
import { Client } from '../services/ClientService.dto';
import LoanService from '../services/LoanService';
import { Loan } from '../services/LoanService.dto';
import { appReducer, AppAction } from './appReducer';

//* Define information
export interface AppState {
	loansHistory: Loan[];
	clients: Client[];
}

//* Definition and what must export my context
interface AppContextProps {
	appState: AppState;
	dispatch: Dispatch<AppAction>;
}

//* Initial State
export const initialAppState: AppState = {
	loansHistory: [],
	clients: [],
};

//* Create context
export const AppContext = createContext<AppContextProps>({
	appState: initialAppState,
	dispatch: () => {
		return;
	},
});

//* Component that provide my state
export const AppProvider: FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [appState, dispatch] = useReducer(appReducer, initialAppState);

	useEffect(() => {
		getLoans();
		geClients();
	}, []);

	async function getLoans() {
		LoanService.getLoans().then((res) => {
			console.log('from provider: ', res.data);

			dispatch({
				type: '[loan] charge initial loans',
				payload: res.data.loans.map((loan) => ({
					...loan,
					client: `${loan.client.firstName} ${loan.client.lastName}`,
				})),
			});
		});
	}

	async function geClients() {
		ClientService.getClients().then((res) => {
			console.log('from provider: ', res.data);

			dispatch({
				type: '[client] charge initial clients',
				payload: res.data.clients,
			});
		});
	}

	return (
		<AppContext.Provider value={{ appState, dispatch }}>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => useContext(AppContext);
