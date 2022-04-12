export default class Logger {
  private static readonly CLASS_COLOR: string = '#bada55';
  private static readonly METHOD_COLOR: string = '#badaff';
  private static readonly WARN_COLOR: string = '#ffaa33';
  private static readonly ERROR_COLOR: string = '#ff5511';

  public static log(
    caller: any,
    message: string,
    data: unknown = null,
    cColor = '',
    mColor = '',
    callerTrace: any = null,
  ): void {
    const callerName: string = caller.name ? caller.name : caller?.constructor.name;

    // It's Development sugar..
    // Works only in some browsers.
    callerTrace = callerTrace ? callerTrace : new Error().stack?.split('\n');

    let callerMethod = 'unknown method';

    if (callerTrace.length > 1 && callerTrace[2].split(' ').length == 3) {
      callerMethod = callerTrace[2].trim().split(' ')[1];

      if (!callerMethod) callerMethod = 'unknown method';
      else if (callerMethod == 'new') callerMethod = 'constructor';
      else if (callerMethod.split('.').length > 1)
        callerMethod = callerMethod.split('.')[callerMethod.split('.').length - 1];
    }

    const classColor: string = cColor ? cColor : this.CLASS_COLOR;
    const methodColor: string = mColor ? mColor : this.METHOD_COLOR;

    console.log(
      `%c[${callerName}]` + `%c[${callerMethod}]\n` + `%c${message}`,
      `color: ${classColor};font-weight: bold`,
      `color: ${methodColor};font-weight: bold`,
      'font-weight: 100',
      data ? data : '',
    );
  }

  public static error(caller: any, message: string, data: unknown = null): void {
    Logger.log(caller, message, data, this.ERROR_COLOR, undefined, new Error().stack?.split('\n'));
  }

  public static warn(caller: any, message: string, data: unknown = null): void {
    Logger.log(caller, message, data, this.WARN_COLOR, undefined, new Error().stack?.split('\n'));
  }
}
