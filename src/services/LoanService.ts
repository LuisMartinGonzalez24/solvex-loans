import axios from 'axios';
import { LoanResponse } from './LoanService.dto';

const LOAN_URL = '/loan';

export default class LoanService {
	static get axios() {
		const instance = axios.create({
			baseURL: 'http://localhost:8080',
		});

		return instance;
	}

	static getLoan(id: string) {
		return LoanService.axios.get<LoanResponse>(`${LOAN_URL}/${id}`);
	}
}
