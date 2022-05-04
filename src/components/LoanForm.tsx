import { useState } from 'react';
import { AxiosError } from 'axios';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import { FormInputGroup } from './FormInputGroup';
import { LoanFields, loanFormSchema } from '../interfaces/YupValidationSchemas';
import ClientCombobox from './Combobox';

interface RegisterFormProps {
	onSubmit: (data: LoanFields) => Promise<void>;
}

const LoanForm = (props: RegisterFormProps) => {
	const [status, setStatus] = useState<string>();
	const [loading, setLoading] = useState(false);

	const methods = useForm<LoanFields>({
		defaultValues: {
			clientId: '',
			loanAmount: 0,
			interestRate: 0.5,
			typeInterest: 'SIMPLE',
		},
		resolver: yupResolver(loanFormSchema),
		mode: 'onSubmit',
	});

	const handleOnSubmit = async (data: LoanFields) => {
		setLoading(true);
		try {
			await props.onSubmit(data);
			setStatus(undefined);
		} catch (err) {
			const error = err as AxiosError;

			if (error.response) {
				console.log(error.response.data);
				setStatus('Data register form not provided incorrects');
				return;
			}
			throw new Error('Error into submit loginForm');
		} finally {
			setLoading(false);
		}
	};

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={methods.handleSubmit(handleOnSubmit)}
				className='px-6 py-6 max-w-lg mx-auto rounded-md shadow-lg bg-white'
			>
				{status && (
					<div className='mt-2 mb-3 border-l-4 border-red-500 text-red-700 py-2 pl-4 pr-1 bg-gray-200'>
						<p className='text-sm'>{status}</p>
					</div>
				)}

				<label
					htmlFor={'clientLoan'}
					className='inline-block text-black text-base font-bold mb-2 cursor-pointer'
				>
					Cient Loan
				</label>

				<ClientCombobox
					clients={[]}
					control={{
						...methods.control,
						name: 'clientLoan',
					}}
				/>

				<FormInputGroup
					inputType={'number'}
					labelText={'Loan amount'}
					placeHolderText={'Loan amount'}
					control={{
						...methods.control,
						name: 'loanAmount',
					}}
				/>

				<FormInputGroup
					inputType={'number'}
					labelText={'Loan amount'}
					placeHolderText={'Loan amount'}
					control={{
						...methods.control,
						name: 'capital',
					}}
				/>
				<FormInputGroup
					inputType={'number'}
					labelText={'Loan amount'}
					placeHolderText={'Loan amount'}
					control={{
						...methods.control,
						name: 'capital',
					}}
				/>

				<button
					type='submit'
					disabled={loading}
					className='px-4 py-3 uppercase rounded-md font-semibold bg-gray-800 text-white hover:bg-blue-600 my-4 w-full transition-colors duration-300'
				>
					{loading ? 'Registering loan...' : 'Register loan'}
				</button>
			</form>
		</FormProvider>
	);
};

export default LoanForm;