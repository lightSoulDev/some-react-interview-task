export interface IActionInfo<T> {
  id: string;
  result: ResponseResult;
  value: T;
}

export enum ResponseResult {
  SUCCESS = 0,
  PENDING,
  INVALID,
  ERROR,
}
