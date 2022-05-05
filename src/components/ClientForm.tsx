import { useState } from 'react';
import { AxiosError } from 'axios';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import { FormInputGroup } from './FormInputGroup';
import {
	ClientFields,
	clientFormSchema,
} from '../interfaces/YupValidationSchemas';
import ClientCombobox, { Client } from './Combobox';

interface RegisterFormProps {
	onSubmit: (data: ClientFields) => Promise<void>;
}

const ClientForm = (props: RegisterFormProps) => {
	const [status, setStatus] = useState<string>();
	const [loading, setLoading] = useState(false);

	const methods = useForm<ClientFields>({
		defaultValues: {
			firstName: '',
			lastName: '',
		},
		resolver: yupResolver(clientFormSchema),
		mode: 'onSubmit',
	});

	const handleOnSubmit = async (data: ClientFields) => {
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
					inputType={'text'}
					labelText={'First name'}
					placeHolderText={'First name'}
					control={{
						...methods.control,
						name: 'firstName',
					}}
				/>

				<FormInputGroup
					inputType={'text'}
					labelText={'Last name'}
					placeHolderText={'Last name'}
					control={{
						...methods.control,
						name: 'lastName',
					}}
				/>

				<button
					type='submit'
					disabled={loading}
					className='px-4 py-3 uppercase rounded-md font-semibold bg-gray-800 text-white hover:bg-blue-600 my-4 w-full transition-colors duration-300'
				>
					{loading ? 'Registering loan...' : 'Register client'}
				</button>
			</form>
		</FormProvider>
	);
};

export default ClientForm;
