import {AxiosResponse} from 'axios';
import {LocaleList} from '../../locale/locale.types';
import HttpClient from '../core/HttpClient';

const DefaultPing = 0;

export class MockApi extends HttpClient {
  private static classInstance?: MockApi;

  private constructor() {
    super({
      baseURL: 'http://127.0.0.1:3001',
      headers: {'Content-type': 'application/json; charset=UTF-8'},
    });
  }

  public static getInstance(): MockApi {
    if (!this.classInstance) this.classInstance = new MockApi();
    return this.classInstance;
  }

  private representResponse = async <T = never>(
    mock: T,
    ping?: number,
  ): Promise<AxiosResponse<T, any>> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(
          new Promise<T>(_resolve => {
            _resolve(mock);
          }),
        );
      }, ping ?? DefaultPing);
    });
  };

  private representError = async <T = never>(
    mock: T,
    ping?: number,
  ): Promise<AxiosResponse<T, any>> => {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject();
      }, ping ?? DefaultPing);
    });
  };

  public withTimeout = <T = never>(prom: T, time: number): T | Promise<unknown> =>
    Promise.race([prom, new Promise((_, reject) => setTimeout(reject, time))]);

  public getData = (ping?: number): Promise<AxiosResponse<string, any>> =>
    this.representResponse<string>('{ ヽ(⌒‐⌒)ゝ }', ping);

  private mockLocales: LocaleList = {
    ru: {
      'Loading.First': 'Виджет грузится',
      'Loading.Second': 'Виджет ещё грузится',
      'Loading.Third': 'Загрузка идёт дольше чем обычно. Пожалуйста, подождите',
      'Error.Timeout': 'Ошибка при загрузке. Пожалуйста -- обновите окно',
      'Success.LoadingFinished': 'Виджет загружен!',
      'Extra.Toggle': 'Переключить',
      'Extra.ToggleMessage': 'Нажмите на кнопку <Переключить> для начала',
      'Extra.DataDelay': 'Задержка загрузки данных:',
      'Extra.MessageInterval': 'Интервал показа сообщений (N / {message count}):',
    },
    en: {
      'Loading.First': 'Widget is loading',
      'Loading.Second': 'Widget is still loading',
      'Loading.Third': 'Loading takes longer than usual. Please wait',
      'Error.Timeout': 'Error while loading widget. Please refresh the page',
      'Success.LoadingFinished': 'Widget has been loaded!',
      'Extra.Toggle': 'Toggle',
      'Extra.ToggleMessage': 'Press <Toggle> to start.',
      'Extra.DataDelay': 'Set data delay:',
      'Extra.MessageInterval': 'Set message interval (N / {message count}):',
    },
  };

  public getLocales = (ping?: number): Promise<AxiosResponse<LocaleList, any>> =>
    this.representResponse<LocaleList>(this.mockLocales, ping);
}
