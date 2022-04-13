import {Locales} from '../locale/locale.types';

const DefaultPing = 0;

export class MockApi {
  private static classInstance?: MockApi;

  public static getInstance(): MockApi {
    if (!this.classInstance) this.classInstance = new MockApi();
    return this.classInstance;
  }

  private representResponse = async <T = never>(mock: T, ping?: number): Promise<T> => {
    return new Promise<T>(resolve => {
      setTimeout(() => {
        resolve(mock);
      }, ping ?? DefaultPing);
    });
  };

  private representError = async <T = never>(mock: T, ping?: number): Promise<T> => {
    return new Promise<T>((_, reject) => {
      setTimeout(() => {
        reject();
      }, ping ?? DefaultPing);
    });
  };

  public withTimeout = <T = never>(prom: Promise<T>, time: number): Promise<T> =>
    Promise.race<T>([
      prom,
      new Promise<T>((_, reject) =>
        setTimeout(() => {
          reject('Error.Timeout');
        }, time),
      ),
    ]);

  public getData = (ping?: number): Promise<string> =>
    this.representResponse<string>('{ ヽ(⌒‐⌒)ゝ }', ping);

  private mockLocales: Locales = {
    ru: {
      'Loading.First': 'Виджет грузится',
      'Loading.Second': 'Виджет ещё грузится',
      'Loading.Third': 'Загрузка идёт дольше чем обычно. Пожалуйста, подождите',
      'Error.Timeout': 'Ошибка при загрузке. Пожалуйста -- обновите окно',
      'Success.LoadingFinished': 'Виджет загружен!',
      'Extra.Toggle': 'Переключить',
      'Extra.ToggleMessage': 'Нажмите на кнопку <Переключить> для начала',
      'Extra.DataDelay': 'Задержка загрузки данных:',
      'Extra.MessageInterval': 'Интервал показа сообщений:',
      'Extra.Timeout': 'Таймаут:',
    },
    en: {
      'Loading.First': 'Widget is loading',
      'Loading.Second': 'Widget is still loading',
      'Loading.Third': 'Loading takes longer than usual. Please wait',
      'Error.Timeout': 'Error while loading widget. Please refresh the page',
      'Success.LoadingFinished': 'Widget loaded!',
      'Extra.Toggle': 'Toggle',
      'Extra.ToggleMessage': 'Press <Toggle> to start.',
      'Extra.DataDelay': 'Data delay:',
      'Extra.MessageInterval': 'Message interval:',
      'Extra.Timeout': 'Timeout:',
    },
  };

  public getLocales = (ping?: number): Promise<Locales> =>
    this.representResponse<Locales>(this.mockLocales, ping);
}
