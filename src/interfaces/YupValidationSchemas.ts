import { object, string, InferType, number } from 'yup';

export enum TypeInterest {
	SIMPLE = 'SIMPLE',
	COMPOUND = 'COMPOUND',
}

//* REGEX
// const validationPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#!@$%^&*()+=]).{8,20}$/;

//* MESSAGES
const FIELD_REQUIRED = 'This field is required';
const FIRST_NAME_ERROR = 'Letters and spaces, can have accents';
const USER_NAME_ERROR =
	'Username at least 4 charatecers and letters, numbers, hyphen and underscore are allowed';

const loanFormSchema = object({
	loanAmount: number().min(5000).required(FIELD_REQUIRED),
	interestRate: number().min(3).required(FIELD_REQUIRED),
	typeInterest: string()
		.oneOf(Object.values(TypeInterest))
		.required('Value send not allowed'),
	period: number().min(3).max(12).required(),
});

const clientFormSchema = object({
	firstName: string()
		.min(3, (value) => `Must be at least ${value.min} characters`)
		.max(40, (value) => `Must be at most ${value.max} characters`)
		.matches(/^[a-zA-ZÀ-ÿ\s]{3,40}$/, { message: FIRST_NAME_ERROR })
		.required(FIELD_REQUIRED),
	lastName: string()
		.min(3, (value) => `Must be at least ${value.min} characters`)
		.max(40, (value) => `Must be at most ${value.max} characters`)
		.matches(/^[a-zA-ZÀ-ÿ\s]{3,40}$/, { message: FIRST_NAME_ERROR })
		.required(FIELD_REQUIRED),
});

export type ClientFields = InferType<typeof clientFormSchema>;
export type LoanFields = InferType<typeof loanFormSchema>;

export { loanFormSchema, clientFormSchema };
