import AxiosClient from './AxiosClient';
import { LoanListResponse, LoanParams, LoanResponse } from './LoanService.dto';
import { LoanFields } from '../interfaces/YupValidationSchemas';

const LOAN_URL = '/loan';

export default class LoanService {
	static getLoans() {
		return AxiosClient.axios.get<LoanListResponse>(LOAN_URL);
	}

	static getLoan(id: string) {
		return AxiosClient.axios.get<LoanResponse>(`${LOAN_URL}/${id}`);
	}

	static registerLoan(params: LoanParams) {
		return AxiosClient.axios.post<LoanResponse>(LOAN_URL, params);
	}
}
