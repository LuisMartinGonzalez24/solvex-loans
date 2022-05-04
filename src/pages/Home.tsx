import { FC } from 'react';
import { Sidebar } from '../components';

const HomePage: FC = () => {
	return (
		<main className='bg-gray-100 grid grid-cols-11 min-h-screen'>
			<div className='col-span-2 bg-white shadow-lg overflow-y-auto'>
				<div className='h-96'>
					<Sidebar className='px-4' loans={[]} />
				</div>
			</div>
		</main>
	);
};

export default HomePage;
