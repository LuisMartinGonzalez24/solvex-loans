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
	options: string[];
	control: UseControllerProps<FieldValue<FieldValues>>;
}

export const SelectInputGroup = ({
	icon,
	options,
	labelText,
	control,
}: FormInputGroupProps) => {
	const { field, fieldState } = useController(control);

	return (
		<div className='mb-4'>
			<label
				htmlFor={control.name}
				className='inline-block text-black text-base font-bold mb-2 cursor-pointer'
			>
				{labelText}
			</label>
			<div>
				<select
					{...field}
					id={control.name}
					className='bg-white border-2 shadow appearance-none w-full rounded py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-none focus:border-slate-600 foc transition-colors duration-300'
				>
					{options.map((option, index) => (
						<option
							key={index}
							value={option}
							className='uppercase'
						>
							{option}
						</option>
					))}
				</select>
				{icon && (
					<FontAwesomeIcon icon={icon} className='absolute left-3' />
				)}
			</div>
		</div>
	);
};
