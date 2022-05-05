import { Fragment, useState, FC, Dispatch } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

export type Client = {
	id: string;
	name: string;
};

interface Props {
	clients: Client[];
	selected: Client;
	setSelected: Dispatch<React.SetStateAction<Client>>;
}

export const ClientCombobox: FC<Props> = ({
	clients,
	selected,
	setSelected,
}) => {
	const [query, setQuery] = useState('');

	const filteredclients =
		query === ''
			? clients
			: clients.filter((client) =>
					client.name
						.toLowerCase()
						.replace(/\s+/g, '')
						.includes(query.toLowerCase().replace(/\s+/g, ''))
			  );

	return (
		<div className='mb-4'>
			<Combobox value={selected} onChange={setSelected} name={'client'}>
				<div className='relative mt-1'>
					<div className='relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm'>
						<Combobox.Input
							className='border-2 shadow appearance-none w-full rounded py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-none focus:border-slate-600 transition-colors duration-300'
							displayValue={(client: Client) => client.name}
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
							{filteredclients.length === 0 && query !== '' ? (
								<div className='relative cursor-default select-none py-2 px-4 text-gray-700'>
									Nothing found.
								</div>
							) : (
								filteredclients.map((client) => (
									<Combobox.Option
										key={client.id}
										className={({ active }) =>
											`relative cursor-default select-none py-2 pl-10 pr-4 ${
												active
													? 'bg-teal-600 text-white'
													: 'text-gray-900'
											}`
										}
										value={client}
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
													{client.name}
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
		</div>
	);
};
