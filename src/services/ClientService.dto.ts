export type Client = {
	id: string;
	client: string;
};

export interface ClientsResponse {
	clients: Client[];
}
