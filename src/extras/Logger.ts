/* eslint-disable @typescript-eslint/no-explicit-any */
export default class Logger {
  private static readonly CLASS_COLOR: string = '#bada55';
  private static readonly WARN_COLOR: string = '#ffaa33';
  private static readonly ERROR_COLOR: string = '#ff5511';

  public static log(caller: any, message: string, data: unknown = null, cColor = ''): void {
    const callerName: string = caller.name ? caller.name : caller?.constructor?.name;
    const classColor: string = cColor ? cColor : this.CLASS_COLOR;

    console.log(
      `%c[${callerName}]\n` + `%c${message}`,
      `color: ${classColor};font-weight: bold`,
      'font-weight: 100',
      data ? data : '',
    );
  }

  public static error(caller: any, message: string, data: unknown = null): void {
    Logger.log(caller, message, data, this.ERROR_COLOR);
  }

  public static warn(caller: any, message: string, data: unknown = null): void {
    Logger.log(caller, message, data, this.WARN_COLOR);
  }
}
