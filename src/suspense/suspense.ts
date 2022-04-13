import {MockApi} from '../mock/MockApi';

enum State {
  PENDING = 0,
  SUCCESS,
  ERROR,
}

export type WrapPromise<T> = {
  read():
    | {
        data?: T;
        error?: Error;
      }
    | undefined;
};

export const wrapPromise = <T>(promise: Promise<T>): WrapPromise<T> => {
  let status = State.PENDING;
  let result: T;
  let errorReason: string;
  const suspender = promise.then(
    r => {
      status = State.SUCCESS;
      result = r;
    },
    e => {
      status = State.ERROR;
      errorReason = e;
    },
  );
  return {
    read() {
      if (status === State.PENDING) {
        throw suspender;
      } else if (status === State.ERROR) {
        return {error: new Error(errorReason)};
      } else if (status === State.SUCCESS) {
        return {data: result};
      }
    },
  };
};

export type MockDataWrap = {
  mockData: WrapPromise<string>;
};

export const fetchMockData = (ping: number, timeout?: number): MockDataWrap => {
  const api = MockApi.getInstance();
  const promise = api.getData(ping);
  return {
    mockData: wrapPromise<string>(timeout ? api.withTimeout<string>(promise, timeout) : promise),
  };
};
