import { useState } from 'react';
import { AxiosError } from 'axios';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import { FormInputGroup } from './FormInputGroup';
import { LoanFields, loanFormSchema } from '../interfaces/YupValidationSchemas';
import { SelectInputGroup } from './FormSelectGroup';

interface RegisterFormProps {
	onSubmit: (data: LoanFields) => Promise<void>;
}

const LoanForm = (props: RegisterFormProps) => {
	const [status, setStatus] = useState<string>();
	const [loading, setLoading] = useState(false);

	const methods = useForm<LoanFields>({
		defaultValues: {
			// clientId: '',
			loanAmount: 0,
			interestRate: 1,
			period: 3,
			typeInterest: 'SIMPLE',
		},
		resolver: yupResolver(loanFormSchema),
		mode: 'onSubmit',
	});

	const handleOnSubmit = async (data: LoanFields) => {
		console.log('llega aqui');
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
				className='px-6 py-6 rounded-md shadow-lg bg-white'
			>
				{status && (
					<div className='mt-2 mb-3 border-l-4 border-red-500 text-red-700 py-2 pl-4 pr-1 bg-gray-200'>
						<p className='text-sm'>{status}</p>
					</div>
				)}

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
					labelText={'Interest rate'}
					placeHolderText={'Interest rate'}
					control={{
						...methods.control,
						name: 'interestRate',
					}}
				/>

				<FormInputGroup
					inputType={'number'}
					labelText={'Period'}
					placeHolderText={'Period'}
					control={{
						...methods.control,
						name: 'period',
					}}
				/>

				<SelectInputGroup
					labelText={'Interest type'}
					options={['simple', 'compound']}
					control={{
						...methods.control,
						name: 'typeInterest',
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
