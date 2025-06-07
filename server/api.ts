import axios, { AxiosError, AxiosInstance } from 'axios';
import { getToken } from './token';

const baseURL = process.env.EXPO_PUBLIC_API_URL;

const apiClient = axios.create({ baseURL });
const authenticatedClient = axios.create({ baseURL });

const clients: AxiosInstance[] = [apiClient, authenticatedClient];

const attachResponseInterceptor = (client: AxiosInstance) => {
	client.interceptors.response.use(
		response => response,
		(error: AxiosError) => {
			if (error.response) {
				const status = error.response.status;
				const data = error.response.data as { error?: string;[key: string]: any };

				return Promise.reject({
					error: {
						...data,
						status,
					},
				});
			}

			return Promise.reject({
				status: null,
				message: 'Erro de rede ou sem resposta do servidor',
				data: null,
			});
		}
	);
};

const attachAuthInterceptor = (client: AxiosInstance) => {
	client.interceptors.request.use(
		async config => {
			const token = await getToken();

			if (token) {
				if (typeof config.headers?.set === 'function') {
					config.headers.set('Authorization', `Bearer ${token}`);
				}
			}

			return config;
		},
		error => Promise.reject(error)
	);
};

clients.forEach(attachResponseInterceptor);

attachAuthInterceptor(authenticatedClient);

export { apiClient, authenticatedClient };
