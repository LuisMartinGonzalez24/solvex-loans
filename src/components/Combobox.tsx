import { Fragment, useState, FC } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import {
	FieldValues,
	UseControllerProps,
	FieldValue,
	useController,
} from 'react-hook-form';

type Client = {
	id: string;
	fullName: string;
};

interface Props {
	clients: Client[];
	control: UseControllerProps<FieldValue<FieldValues>>;
}

const people = [
	{ id: 1, name: 'Wade Cooper' },
	{ id: 2, name: 'Arlene Mccoy' },
	{ id: 3, name: 'Devon Webb' },
	{ id: 4, name: 'Tom Cook' },
	{ id: 5, name: 'Tanya Fox' },
	{ id: 6, name: 'Hellen Schmidt' },
	{ id: 7, name: 'Wade Cooper' },
	{ id: 8, name: 'Arlene Mccoy' },
	{ id: 9, name: 'Devon Webb' },
	{ id: 10, name: 'Tom Cook' },
	{ id: 11, name: 'Tanya Fox' },
	{ id: 12, name: 'Hellen Schmidt' },
	{ id: 13, name: 'Wade Cooper' },
	{ id: 14, name: 'Arlene Mccoy' },
	{ id: 15, name: 'Devon Webb' },
	{ id: 16, name: 'Tom Cook' },
	{ id: 17, name: 'Tanya Fox' },
	{ id: 18, name: 'Hellen Schmidt' },
];

const ClientCombobox: FC<Props> = ({ control }) => {
	const { field, fieldState } = useController(control);
	const [selected, setSelected] = useState(people[0]);
	const [query, setQuery] = useState('');

	const filteredPeople =
		query === ''
			? people
			: people.filter((person) =>
					person.name
						.toLowerCase()
						.replace(/\s+/g, '')
						.includes(query.toLowerCase().replace(/\s+/g, ''))
			  );

	return (
		<div className='mb-4'>
			<Combobox value={selected} onChange={setSelected}>
				<div className='relative mt-1'>
					<div className='relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm'>
						<Combobox.Input
							{...field}
							id='clientLoan'
							name='clientLoan'
							className='border-2 shadow appearance-none w-full rounded py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-none focus:border-slate-600 transition-colors duration-300'
							displayValue={(person) => person.name}
							onChange={(event) => setQuery(event.target.value)}
						/>
						<Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
							<SelectorIcon className='h-5 w-5 text-gray-400' />
						</Combobox.Button>
					</div>
					<Transition
						as={Fragment}
						leave='transition ease-in duration-100'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
						afterLeave={() => setQuery('')}
					>
						<Combobox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50'>
							{filteredPeople.length === 0 && query !== '' ? (
								<div className='relative cursor-default select-none py-2 px-4 text-gray-700'>
									Nothing found.
								</div>
							) : (
								filteredPeople.map((person) => (
									<Combobox.Option
										key={person.id}
										className={({ active }) =>
											`relative cursor-default select-none py-2 pl-10 pr-4 ${
												active
													? 'bg-teal-600 text-white'
													: 'text-gray-900'
											}`
										}
										value={person}
									>
										{({ selected, active }) => (
											<>
												<span
													className={`block truncate ${
														selected
															? 'font-medium'
															: 'font-normal'
													}`}
												>
													{person.name}
												</span>
												{selected ? (
													<span
														className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
															active
																? 'text-white'
																: 'text-teal-600'
														}`}
													>
														<CheckIcon
															className='h-5 w-5'
															aria-hidden='true'
														/>
													</span>
												) : null}
											</>
										)}
									</Combobox.Option>
								))
							)}
						</Combobox.Options>
					</Transition>
				</div>
			</Combobox>

			{fieldState.error && (
				<div className='mt-2 border-l-4 border-red-500 text-red-700 py-2 pl-4 pr-1 bg-gray-200'>
					<p className='text-xs'>{fieldState.error.message}</p>
				</div>
			)}
		</div>
	);
};
export default ClientCombobox;
