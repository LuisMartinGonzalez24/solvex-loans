import axios from 'axios';
export default class AxiosClient {
	static get axios() {
		const instance = axios.create({
			baseURL: 'http://localhost:8080',
		});

		return instance;
	}
}
