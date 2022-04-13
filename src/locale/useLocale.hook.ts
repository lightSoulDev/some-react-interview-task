import {useSettingsContext} from '../context/settings';
import LocaleManager from './LocaleManager';

type LocaleHook = (key: string) => string;

const useLocale = (): LocaleHook => {
  const {settings} = useSettingsContext();

  return (key: string): string => {
    return LocaleManager.get(key, settings.locale);
  };
};

export default useLocale;
