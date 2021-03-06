import AxiosClient from './AxiosClient';
import { Client, ClientsResponse } from './ClientService.dto';

const CLIENT_URL = '/client';

export default class ClientService {
	static getClients() {
		return AxiosClient.axios.get<ClientsResponse>(CLIENT_URL);
	}

	static registerClient(firstName: string, lastName: string) {
		return AxiosClient.axios.post<Client>(CLIENT_URL, {
			firstName,
			lastName,
		});
	}
}
