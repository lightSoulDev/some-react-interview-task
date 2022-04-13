import DefaultLocales from './default.json';
import {LocaleList, Locales} from './locale.types';

export default class LocaleManager {
  private static readonly DEFAULT_LIST: LocaleList = DefaultLocales;
  private static readonly DEFAULT_LOCALE: string = 'en';

  private static external: Locales;

  public static setExternalLocales(value: Locales): void {
    this.external = value;
  }

  public static get(key: string, locale = this.DEFAULT_LOCALE): string {
    if (this.external) {
      const localeList: LocaleList = this.external[locale] ?? this.external[this.DEFAULT_LOCALE];
      return localeList[key as keyof LocaleList] ?? key;
    } else {
      return this.DEFAULT_LIST[key as keyof LocaleList] ?? key;
    }
  }

  public static getExternalLocalesList(): Array<string> {
    return this.external ? Object.keys(this.external) : [this.DEFAULT_LOCALE];
  }
}
