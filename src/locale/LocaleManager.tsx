import DefaultLocales from './default.json';
import {LocaleList} from './locale.types';

export default class LocaleManager {
  private static default: Record<string, string> = DefaultLocales;
  private static external: LocaleList;

  public static setExternalLocales(value: LocaleList): void {
    this.external = value;
  }

  public static get(key: string, locale = 'en'): string {
    if (this.external && this.external[locale] && this.external[locale][key])
      return this.external[locale][key];
    if (this.default[key]) return this.default[key];
    return key;
  }

  public static getExternalLocalesList(): Array<string> {
    return this.external ? Object.keys(this.external) : ['en'];
  }
}
