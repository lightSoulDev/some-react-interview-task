import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import Logger from '../../extras/Logger';
import {IHttpOptions} from './HttpClient.types';

declare module 'axios' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface AxiosResponse<T = any> extends Promise<T> {}
}

abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  public constructor(options: IHttpOptions) {
    this.instance = axios.create({
      baseURL: options.baseURL,
      headers: options.headers ?? {},
      params: options.params ?? {},
    });

    this._initializeResponseInterceptor();
  }

  private _initializeResponseInterceptor = (): void => {
    this.instance.interceptors.response.use(this._handleResponse, this._handleError);
  };

  private _handleResponse = ({data}: AxiosResponse): Promise<AxiosResponse> => data;

  protected _handleError = (error: AxiosError): Promise<AxiosError> =>
    Promise.reject(error.response);

  protected get = async <T = never, R = AxiosResponse<T>>(
    path: string,
    config?: AxiosRequestConfig,
  ): Promise<R> =>
    await this.instance.get(path, config).catch(error => {
      Logger.error(this, error);
    });

  protected post = async <T = never, R = AxiosResponse<T>>(
    path: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<R> =>
    await this.instance.post(path, data, config).catch(error => {
      Logger.error(this, error);
    });
}

export default HttpClient;
