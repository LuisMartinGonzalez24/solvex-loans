import { AppState } from './AppProvider';
import { Loan } from '../services/LoanService.dto';
import { Client } from '../services/ClientService.dto';

export type AppAction =
	| { type: '[loan] add loan'; payload: Loan }
	| { type: '[loan] charge initial loans'; payload: Loan[] }
	| { type: '[client] add client'; payload: Client }
	| { type: '[client] charge initial clients'; payload: Client[] };

const appReducer = (state: AppState, action: AppAction): AppState => {
	console.log('dispatch: ', action.type);

	switch (action.type) {
		case '[loan] charge initial loans':
			return {
				...state,
				loansHistory: action.payload,
			};

		case '[loan] add loan':
			return {
				...state,
				loansHistory: [...state.loansHistory, action.payload],
			};

		case '[client] add client':
			return {
				...state,
				clients: [...state.clients, action.payload],
			};

		case '[client] charge initial clients':
			return {
				...state,
				clients: action.payload,
			};

		default:
			return state;
	}
};

export { appReducer };
