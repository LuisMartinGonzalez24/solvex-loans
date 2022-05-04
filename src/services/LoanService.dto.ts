export interface LoanResponse {
	loan: Loan;
}

export interface Loan {
	client: string;
	capital: number;
	interestRate: number;
	typeInterest: string;
	period: number;
	createdAt: string;
	id: string;
}