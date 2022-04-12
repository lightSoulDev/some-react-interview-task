import {AxiosInstance, AxiosRequestHeaders} from 'axios';

export interface IHttpClient {
  instance: AxiosInstance;
}

export interface IHttpOptions {
  baseURL: string;
  headers?: AxiosRequestHeaders;
  params?: Record<string, unknown>;
}
