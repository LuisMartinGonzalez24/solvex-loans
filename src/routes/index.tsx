import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/Home';

const App: FC = () => {
	return (
		<main className='min-h-screen bg-slate-400'>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<HomePage />} />
				</Routes>
			</BrowserRouter>
		</main>
	);
};

export default App;
