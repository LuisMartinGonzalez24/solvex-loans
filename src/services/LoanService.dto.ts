export enum StatusLoan {
	Active = 'Active',
	Paid = 'Paid',
	Rejected = 'Rejected',
}

export enum InterestType {
	Simple = 'SIMPLE',
	Compound = 'COMPOUND',
}

export interface LoanResponse {
	loan: Loan;
}

export interface LoanListResponse {
	loans: {
		client: {
			_id: string;
			firstName: string;
			lastName: string;
		};
		id: string;
		capital: number;
		interestRate: number;
		typeInterest: InterestType;
		period: number;
		createdAt: string;
		status: StatusLoan;
	}[];
}

export interface Loan {
	id: string;
	client: string;
	capital: number;
	interestRate: number;
	typeInterest: InterestType;
	period: number;
	createdAt: string;
	status: StatusLoan;
}

export interface LoanParams {
	clientId: string;
	capital: number;
	interestRate: number;
	typeInterest: string;
	period: number;
}
