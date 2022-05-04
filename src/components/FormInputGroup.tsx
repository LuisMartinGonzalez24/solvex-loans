import { HTMLInputTypeAttribute } from 'react';
import {
	FieldValues,
	UseControllerProps,
	FieldValue,
	useController,
} from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import classNames from 'classnames';

interface FormInputGroupProps {
	icon?: IconProp;
	labelText: string;
	placeHolderText: string;
	errorMessage?: string;
	inputType: HTMLInputTypeAttribute;
	control: UseControllerProps<FieldValue<FieldValues>>;
}

export const FormInputGroup = ({
	icon,
	inputType,
	labelText,
	placeHolderText,
	control,
}: FormInputGroupProps) => {
	const { field, fieldState } = useController(control);
	console.log('rendered: ', control.name);

	return (
		<div className='mb-4'>
			<label
				htmlFor={control.name}
				className='inline-block text-black text-base font-bold mb-2 cursor-pointer'
			>
				{labelText}
			</label>
			<div className='relative flex items-center rounded'>
				<input
					{...field}
					id={control.name}
					type={inputType}
					placeholder={placeHolderText}
					className={classNames(
						'border-2 shadow appearance-none w-full rounded py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-none focus:border-slate-600 transition-colors duration-300',
						{
							[`${icon ? 'pl-8' : 'pl-3'}`]: true,
						}
					)}
				/>
				{icon && (
					<FontAwesomeIcon icon={icon} className='absolute left-3' />
				)}
			</div>
			{fieldState.error && (
				<div className='mt-2 border-l-4 border-red-500 text-red-700 py-2 pl-4 pr-1 bg-gray-200'>
					<p className='text-xs'>{fieldState.error.message}</p>
				</div>
			)}
		</div>
	);
};
