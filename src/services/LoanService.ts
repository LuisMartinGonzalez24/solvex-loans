import AxiosClient from './AxiosClient';
import { LoanParams, LoanResponse } from './LoanService.dto';
import { LoanFields } from '../interfaces/YupValidationSchemas';

const LOAN_URL = '/loan';

export default class LoanService {
	static getLoan(id: string) {
		return AxiosClient.axios.get<LoanResponse>(`${LOAN_URL}/${id}`);
	}

	static registerLoan(params: LoanParams) {
		return AxiosClient.axios.post(LOAN_URL, params);
	}
}
