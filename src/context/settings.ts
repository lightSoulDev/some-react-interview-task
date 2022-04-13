/* eslint-disable @typescript-eslint/no-empty-function */
import React, {useContext, createContext} from 'react';
import ISettings from './settings.types';

export const DEFAULT_SETTINGS: ISettings = {
  locale: 'en',
  dataDelay: 5000,
  cycleInterval: 2000,
  timeout: 7000,
};

interface ContextState {
  settings: ISettings;
  setSettings: React.Dispatch<React.SetStateAction<ISettings>> | (() => void);
}

export const SettingsContext = createContext<ContextState>({
  settings: {} as ISettings,
  setSettings: () => {},
});

export const useSettingsContext = (): ContextState => useContext(SettingsContext);
