import axios, { AxiosInstance } from 'axios';
import { ApiUrlType } from 'types/enum';

const BASE_API_URL = 'https://auto-complete-server.vercel.app/';

const DEFAULT_CONFIG = {
  baseURL: `${BASE_API_URL}`,
  timeout: 5000,
} as const;

interface HttpInstanceInterface {
  get: <T>(url: ApiUrlType, params?: {}) => Promise<T>;
}

class HttpInstance implements HttpInstanceInterface {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create(DEFAULT_CONFIG);
  }

  get = async <T>(url: ApiUrlType, params?: {}) => {
    const { data } = await this.instance.get<T>(url, params);

    return data;
  };
}

export const httpInstance = new HttpInstance();
