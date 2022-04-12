import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import LocaleManager from './LocaleManager';

type LocaleHook = (key: string) => string;

const useLocale = (): LocaleHook => {
  const locale = useSelector((state: RootState) => state.settings.locale);

  return (key: string): string => {
    return LocaleManager.get(key, locale);
  };
};

export default useLocale;
