import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/Home';
import { LoanInformation } from '../pages/LoanInformation';

const App: FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/loan/:id' element={<LoanInformation />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
